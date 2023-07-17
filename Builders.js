const builders = (db) => {

    const getAllBuilders = () => {
        let allData = db.manyOrNone('select * from builders');
        return allData;
    }
    return {
        getAllBuilders
    }
}

export default builders;