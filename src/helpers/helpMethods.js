export const splice = (obj = {}) =>{
    let arr = {};
    if (obj) {
        Object.keys(obj).filter((data) => {
            if (data !== "request") {
                arr = {
                    ...arr,
                    [data]: obj[data],
                };
            }
        });
        return arr;
    }
    return false
}
