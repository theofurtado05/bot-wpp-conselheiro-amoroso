class PaymentController {
 
  async webhookKirvano(req, res){
    const data = req.body
    const userInfo = {
        email: data.email,
        phone: data.phone,
        currentPlan: data.currentPlan ?? "Monthly",
        subscription_at: new Date(),
        numMsgSent: 0
    }
    try {
        if(data.event == 'Aproved'){
            if(UserDao.getUserByPhone(data.phone)){
                //update no currentPlan
                const updatedUser = await UserDao.updateUser(data.phone, {
                    currentPlan: userInfo.currentPlan,
                    subscription_at: userInfo.subscription_at,
                    email: userInfo.email
                })
            } else {
                const newUser = await UserDao.createUser(userInfo)
                return res.status(200).send({
                    message: "User created successfully",
                    data: newUser
                })
            }
            
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

export {PaymentController}