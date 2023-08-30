exports.index = async (req, res, next)=>{
    try {
        // 处理请求
        res.send('get /api/home')
    } catch (error) {
        next(error)
    }
}