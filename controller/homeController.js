exports.index = async (req, res, next)=>{
    try {
        // 处理请求
        return res.send('get /api/home')
    } catch (error) {
        next(error)
    }
}