const User = require("./../models/User")
const Community = require("./../models/Community")

const EditProfile = async(req, res) => {
    const userId = req.user.id

    try {
        const {
            name,
            bio,
            nickname,
            major,
            skills,
            languages,
            location,
            university
        } = req.body

        const updatedFields = {
            name,
            "profile.bio": bio,
            "profile.nickname": nickname,
            "profile.major": major,
            "profile.skills": skills,
            "profile.languages": languages,
            "profile.location": location,
            "profile.university": university
        };

        const user = await User.findByIdAndUpdate(userId, {
            $set: updatedFields
        }, {new: true})

        if (!user) 
            return res.status(404).json({message: "User not found"})

        return res
            .status(200)
            .json({user});

    } catch (error) {
        return res
            .status(500)
            .json({error: "Internal server error"});
    }
}

const UserData = async(req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);

        if (!user) 
            res.status(404).json({message: "User not found"});
        
        return res
            .status(200)
            .json({user});
    } catch (error) {
        res
            .status(500)
            .json({error: "Internal server error"});
    }
};

const SearchUsers = async(req, res) => {
    const {searchTerm} = req.searchTerm
    const {communityId} = req.communityId

    try {
        const community = await Community.findById(communityId)

        const users = await User.find({
            name: {
                $regex: searchTerm,
                $options: 'i'
            },
            username: {
                $regex: searchTerm,
                $options: 'i'
            },
            _id: {
                $nin: community.members
            }
        })

        return res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: "Internval server error" });
    }
}

module.exports = {
    EditProfile,
    UserData,
    SearchUsers
}