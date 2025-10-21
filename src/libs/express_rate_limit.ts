import rateLimit from "express-rate-limit";

const limiter = rateLimit ({
    windowMs:  6000,
    limit: 60,
    standardHeaders: "draft-7",
    legacyHeaders :false ,
    message :{
        error: 'You have sent too many requests in a given amout of time. Please try again later.',
    }
})

export default limiter