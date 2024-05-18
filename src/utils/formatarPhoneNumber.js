export function formatarPhoneNumber(phone){
    if(!phone.includes('@c.us')){
        return phone + '@c.us';
    } else {
        return phone
    }
}