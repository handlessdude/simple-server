import colors from 'colors'

export function requestTime(req, res, next) {
    req.requestTime = Date.now()
    next()
}

export function logger(req, res, next) {
    const humanTime = new Date(Number(req.requestTime)*1000)
    console.log('*************=========== NEW REQUEST =========**************\n'
        +colors.bgGreen.black(`Request method: ${req.method}\n`)
        +colors.bgYellow.black(`Request path: ${req.path}\n`)
        +colors.bgCyan.black(`Req.time: ${humanTime}\n`)
        +'REQUEST BODY = '
        +JSON.stringify(req.body)
        +'\n')
    next()
}
