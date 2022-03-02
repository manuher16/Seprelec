import User from "../../models/user"
const searchUserEmail = async (req, res) => {
    try {
        const { email } = req.params
        const user = await User.findOne({ email: email }).populate('idRole')
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            users: [user]
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
export default searchUserEmail