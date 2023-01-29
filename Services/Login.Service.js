export const LoginService = async (req, res) => {
    try {
        const data = LoginValidationSchema.validateSync(req.body, {
            abortEarly: true,
        });

        const user = await UserModel.findOne({ email: data.email });
        console.log(data.password, user.password);

        console.log(
            await bcrypt.compareSync(data.password.toString(), user.password)
        );

        if (bcrypt.compareSync(data.password, user.password)) {
            const token = jwt.sign(req.body, process.env.ACCESS_TOKEN, {
                expiresIn: "1d",
            });
            res.json({
                token,
                success: true,
            });
        } else {
            throw new Error("invalid Credential");
        }
    } catch (error) {
        res.json({
            success: false,
            error: error.errors?.length ? error.errors : error.message,
        });
    }
};
