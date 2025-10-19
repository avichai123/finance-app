

export const register = async(name, phoneNumber, password) =>{
  try{
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/register` , {
      method:'POST',
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({name , phoneNumber , password})
    });

    if(!res.ok){
      const error = await res.text();
      return error;
    }

    return await res.json();
  }catch(error){
    throw error;
  }
}

export const login = async(phoneNumber, password) =>{
 try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Failed to login");
    }

    return await res.json();
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}
