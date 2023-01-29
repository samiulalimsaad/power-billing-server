export const RegistrationService = async (req, res) => {
    try {
        const data = SignUpValidationSchema.validateSync(req.body, {
            abortEarly: true,
        });

        const password = bcrypt.hashSync(data.password, 10);
        data.password = password;

        const newUser = new UserModel(data);
        const user = await newUser.save();

        const token = jwt.sign(req.body, process.env.ACCESS_TOKEN, {
            expiresIn: "1d",
        });
        res.json({
            token,
            success: true,
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.errors?.length ? error.errors : error.message,
        });
    }
};
