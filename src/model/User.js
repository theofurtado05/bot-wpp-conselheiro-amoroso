export class User{
    constructor(created_at, email, phone, currentPlan, subscription_at){
        this.created_at = created_at;
        this.email = email;
        this.phone = phone;
        this.currentPlan = currentPlan;
        this.subscription_at = subscription_at;
    }
}