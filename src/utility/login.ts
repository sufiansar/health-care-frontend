const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    // if (!response.ok) {
    //   throw new Error("Login failed");
    // }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
};

export default loginUser;
