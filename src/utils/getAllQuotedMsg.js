export function getAllQuotedMessages(message) {
    let concatenatedMessage = message.body;
  
    // Função recursiva para obter todos os quotedMsg
    function concatQuotedMsg(quotedMsg) {
      if (quotedMsg) {
        concatenatedMessage = quotedMsg.body + '\n' + concatenatedMessage;
        if (quotedMsg.quotedMsg) {
          concatQuotedMsg(quotedMsg.quotedMsg);
        }
      }
    }
    
    concatQuotedMsg(message.quotedMsg);

    return concatenatedMessage;
}