async function createCertificateCode() {
    const feed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "0123456789";
    let result = '';

    for (let i = 0; i < 3; i++) {                        
        result += feed[Math.floor(Math.random() * (feed.length))]
        result += num[Math.floor(Math.random() * (num.length))]
    }

    return result;
}

export {
    createCertificateCode,
}