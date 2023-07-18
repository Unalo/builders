const builders = (db) => {

    const getAllBuilders = async () => {
        let allData = await db.manyOrNone('select * from build');
        console.log(allData);
        return allData;
    }
    return {
        getAllBuilders
    }
}

export default builders;