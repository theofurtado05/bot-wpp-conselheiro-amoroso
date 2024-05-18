class PaymentController {
 
  async webhookGeneric(req, res){
    const data = req.body
    const userInfo = {
        email: data.email,
        phone: data.phone,
        currentPlan: data.currentPlan ?? "Monthly",
        subscription_at: new Date()
    }
    try {
        if(data.event == 'Aproved'){
            const newUser = await UserDao.createUser(userInfo)
            return res.status(200).send({
                message: "User created successfully",
                data: newUser
            })
        } else {
            return res.status(400).send({
                message: "Invalid event"
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Internal server error",
            error
        })
    }
  }
}