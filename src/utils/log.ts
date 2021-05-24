function log (...args: any) {
    console.log(...args)
}

log.text = `
  __                      _
_/ __\\   ____    ____   /  _\\
/  _/  /\\/  ___ \\/  ___ \\ \\/_ /
\\/_   _ / /  ___/ / __  /  _\\ _   __    ____
/ /  / /\\ \\__  \\ /  ___/ /  /\\ _\\/ __\\/ ____ \\
\\/__/  \\/_____ /\\_____/\\/_ /\\/ _/ /  / / __  /
                         /  _/  / /  __ /
                         \\/___ /\\/__/
`

log.toString = () => console.log(log.text)

export {log}