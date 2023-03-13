import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://dummyjson.com/api/auth?username=" + username + "&password=" + password
      );
      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(true);
        setErrorMessage("");
      } else {
        setIsLoggedIn(false);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const handleRandomUser = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      const users = JSON.parse(data);
      const randomUser = users[Math.floor(Math.random() * users.length)];
      setUsername(randomUser.username);
      setPassword(randomUser.password);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
          <button type="button" onClick={handleRandomUser}>
            Use Random User
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      )}
    </div>
  );
}



(
    
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
  .font-zamara {
    font-family: Montserrat,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"
}
