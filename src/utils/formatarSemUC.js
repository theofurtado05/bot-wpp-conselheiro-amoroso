export const formatarSemUC = (phone) => {
    if(phone.includes('@c.us')){
        return phone.replace('@c.us', '');
    } else {
        return phone
    }
}