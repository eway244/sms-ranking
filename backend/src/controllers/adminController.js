exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); // 获取所有用户
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: '获取用户失败', error });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id); // 根据 ID 获取用户
        if (!user) {
            return res.status(404).json({ message: '用户未找到' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: '获取用户失败', error });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { realName, className, isAuthenticated } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { realName, className, isAuthenticated }, { new: true }); // 更新用户信息
        if (!user) {
            return res.status(404).json({ message: '用户未找到' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: '更新用户失败', error });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id); // 删除用户
        if (!user) {
            return res.status(404).json({ message: '用户未找到' });
        }
        res.status(200).json({ message: '用户已删除' });
    } catch (error) {
        res.status(500).json({ message: '删除用户失败', error });
    }
};

exports.createBlock = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newBlock = new Block({ name, description }); // 创建新版块
        await newBlock.save();
        res.status(201).json(newBlock);
    } catch (error) {
        res.status(500).json({ message: '创建版块失败', error });
    }
};

exports.getBlocks = async (req, res) => {
    try {
        const blocks = await Block.find(); // 获取所有版块
        res.status(200).json(blocks);
    } catch (error) {
        res.status(500).json({ message: '获取版块失败', error });
    }
};

exports.updateBlock = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const block = await Block.findByIdAndUpdate(id, { name, description }, { new: true }); // 更新版块信息
        if (!block) {
            return res.status(404).json({ message: '版块未找到' });
        }
        res.status(200).json(block);
    } catch (error) {
        res.status(500).json({ message: '更新版块失败', error });
    }
};

exports.deleteBlock = async (req, res) => {
    const { id } = req.params;
    try {
        const block = await Block.findByIdAndDelete(id); // 删除版块
        if (!block) {
            return res.status(404).json({ message: '版块未找到' });
        }
        res.status(200).json({ message: '版块已删除' });
    } catch (error) {
        res.status(500).json({ message: '删除版块失败', error });
    }
};