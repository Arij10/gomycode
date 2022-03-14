const { body, validationResult } = require('express-validator');

exports.validationSignUp = [

    body('name','must containt 5 caracters').isEmpty().isLength({min:5}),
    body('password','must containt 5 caracters').isEmpty().isLength({min:5}).isNumeric().isString(),
    body('email', 'must be email format').isEmpty().isEmail(),

]
exports.validationSignIn = [
    body('password','must containt 5 caracters').isEmpty().isLength({min:5}).isNumeric().isString(),
    body('email', 'must be email format').isEmpty().isEmail(),

]

exports.isValid = async (req, res , next) => {
    console.log(req.body)
    try {
        const errors = validationResult(req.body);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});

        }
        next();
    } catch (error) {
        res.status(400).send({msg:'error'})
        
    }


}
