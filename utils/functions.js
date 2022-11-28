import axios from "axios";

export const getRegisterValidation = (required, minLength, maxLength) => {
  const result = {};

  if (required) result.required = "please fill the field";

  if (minLength)
    result.minLength = {
      value: minLength,
      message: `please enter at least ${minLength} characters`
    }

  if (maxLength)
    result.maxLength = {
      value: maxLength,
      message: `please enter less than ${maxLength} characters`
    }

  return result;
}

export const fetchMessages = async (token, name) => {
  if (!token) return [];
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/get-messages`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data?.messages?.map(msg => ({ ...msg, status: msg.sender_name === name ? "to" : "from" }))
}
