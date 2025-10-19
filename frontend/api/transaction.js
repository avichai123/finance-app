

export const getAllTransaction = async(token) => {
    try{
        const result = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/transaction` , {
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`
            }
        });

        if (!result.ok){
            const error = await result.text();
            throw new Error(error || 'Failed request');
        }

        const transactions = await result.json();
        console.log(transactions);
        
        return transactions;
    }catch(error){
        throw error;
    }
}

export const deleteTransaction = async(id , token) => {
    try{
        const result = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/transaction/${id}` , {
            method:'DELETE',
            headers:{
                "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`
            }
        });

        if(!result.ok){
            const error = await result.text();
            throw new Error(error.message);
        }

        return result.json();
        
    }catch(error){
        throw error;
    }
}

export const addTransaction = () =>{
    
}