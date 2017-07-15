class UrlUtils {
    static mountRedirect(req, path) {
        const url = req.protocol.concat('://')
                        .concat(req.get('host'))
                        .concat(path || req.originalUrl);
        return url;
    }
}

export default UrlUtils;


