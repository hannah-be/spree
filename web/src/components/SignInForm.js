import React from "react";

function SignInForm({ onSignIn }) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        console.log("form-submitted", event.target);
        const form = event.target;
        const elements = form.elements; //the key value pairs
        const email = elements.email.value;
        const password = elements.password.value;
        console.log({ email, password });
        onSignIn({ email, password });
      }}
    >
      <label>
        {"Email: "}
        <input type="email" name="email" />
      </label>
      <label>
        {"Password: "}
        <input type="password" name="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}

export default SignInForm;
