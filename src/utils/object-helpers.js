export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {  //передається масив об'єктів, id який необхідно знайти,
    return items.map(u => {                                          //назва властивості об'єкту(id), нова встановлена властивість
        if (u[objPropName] === itemId) {
            return {...u, newObjProps}
        }
        return u;
    })
}
