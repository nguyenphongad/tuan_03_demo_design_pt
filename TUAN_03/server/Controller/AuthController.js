const UserModel = require('../Model/userModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;

    const newUser = new UserModel(req.body);
    try {

        const {username} = req.body

        const oldUser = await UserModel.findOne({ username });
        if (oldUser) {
            return res.status(400).json({ message: "User da ton tai" })
        }

        const user = await newUser.save();

        const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWTKEY,{expiresIn: "1h"}
        );
        res.status(200).json({user,token})


    } catch (error) {
        res.status(500).json({message : error.message})
    }

}

const loginUser = async (req, res)=>{
    const {username, password} = req.body;
    try {
        const checkUser = await UserModel.findOne({username: username})

        if(checkUser){
            const vad = await bcrypt.compare(password, checkUser.password);

            if(!vad){
                res.status(400).json({message:"PASSWORD KHÔNG CHÍNH XÁC"});
                return;
            }else{
                const token  = jwt.sign(
                    { username : checkUser.username, id:checkUser._id },
                    process.env.JWTKEY,
                    {expiresIn: "1h"}
                );
                res.status(200).json({ checkUser, token});
            }
        }else{
            res.status(400).json({message:"USER KHÔNG TỒN TẠI"});
        }

    } catch (error) {
            console.log("lỗi")
        res.status(500).json(error);
    }

}


module.exports = {registerUser,loginUser}
