export const getTemplate = function(template, data) {
    return template.replace(/{(\w+?)}/gi, function(fullMatch, param) {
        return param in data ? data[param] : fullMatch;
    });
}

export const getQueryParam = function(location) {
    const res = {},
        search = location.search.slice(1),
        query = search.split('&')
            .map(param => param.split('='))
            .forEach(param => {
                res[param[0]] = param[1];
            });

    return res;
}
