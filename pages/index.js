import { useState, useEffect } from "react";
import MessageComponent from "components/Message";
import { deleteCookie, getCookie } from "cookies-next"
import { useRouter } from "next/router"
import Script from "next/script"
import { SendBtn } from "subcomponents"
import { useForm } from "react-hook-form";
import { getRegisterValidation } from "utils/functions";
import { fetchMessages } from "utils/functions";
import axios from "axios";
import { AutoCompleteInput } from "components";
import User from "models/User";

export default function Home({ messages: msgs, users: usrs }) {
  const router = useRouter();
  const [messages, setMessages] = useState(msgs);
  const users = JSON.parse(usrs);
  const { register, handleSubmit, formState: { errors }, watch, setValue, control } = useForm();

  const logout = () => {
    deleteCookie("token");
    deleteCookie("name");
    router.push("/auth");
  }

  const sendMessage = async data => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/send-message`, data, {
      headers: { Authorization: `Bearer ${getCookie("token")}` }
    });
    setMessages(prev => [{
      ...res.data.newMessage,
      status: "to"
    }, ...prev]);
  }

  useEffect(() => {
    setInterval(async () => {
      const newMessages = await fetchMessages(getCookie("token"), getCookie("name"));
      setMessages(newMessages);
    }, 5000);
  }, []);

  return (
    <div className="custom-container flex justify-center items-center min-h-screen py-10 pb-20">
      <div className="w-[800px] bg-purple-100 rounded-lg overflow-hidden px-5 pt-3 pb-10">
        <div className="flex justify-between items-center pb-2">
          <h1 className="text-[40px] text-purple-700 font-bold">Hoola</h1>
          <button onClick={logout} className="px-3 py-1.5 text-[14px] font-bold bg-red-600 text-white rounded-md">Leave Account</button>
        </div>
        <div className="h-[300px] overflow-y-auto overflow-x-hidden border-2 border-purple-700 rounded-lg px-2 py-4">
          {messages.length 
            ? messages?.map((msg, i) => <MessageComponent key={i} message={msg} />)
            : (
              <span className="flex justify-center items-center text-[20px] font-semibold h-full w-full">you don&apos;t have messages yet 😭</span>
          )}
        </div>
        <form id="send-form" onSubmit={handleSubmit(sendMessage)} className="mt-2 font-bold">
          <h2 className="mb-0.5 font-bold">Send new one!</h2>
          <label className="mt-2 flex items-center gap-5">
            <span className="text-[20px]">Title:</span>
            <div className="w-full">
              <input
                type="text"
                placeholder="Updates from Business"
                className={`px-3 py-2 border-2 rounded-md w-full font-medium ${errors.title ? "border-red-600" : "border-purple-700"}`}
                {...register("title", getRegisterValidation(true, 3, 100))}
              />
              {errors.title ? <span className="text-red-600 text-[14px]">{errors.title?.message}</span> : null}
            </div>
          </label>

          <label className="block">
            <span>message:</span>
            <textarea
              placeholder={`Hello John!\nToday we got...`}
              className={`px-3 py-2 border-2 rounded-md w-full font-medium ${errors.message ? "border-red-600" : "border-purple-700"}`}
              rows={3}
              {...register("message", getRegisterValidation(true, 10, 1000))}
            ></textarea>
            {errors.message ? <span className="text-red-600 text-[14px] block mt-[-4px]">{errors.message?.message}</span> : null}
          </label>
          <label className="block">
            <span>recipient:</span>
            <div className="flex gap-2 items-start">
              <div className="w-full">
                <AutoCompleteInput
                  error={errors.recipient_name}
                  registers={register("recipient_name", getRegisterValidation(true, 3, 100))}
                  setValue={value => setValue("recipient_name", value)}
                  value={watch("recipient_name")}
                  control={control}
                  name="recipient_name"
                  items={users?.map(usr => ({ id: usr._id, label: usr.name }))}
                />
                {errors.recipient_name ? <span className="text-red-600 text-[14px]">{errors.recipient_name?.message}</span> : null}
              </div>
              <SendBtn disabled={Object.keys(errors).length} />
            </div>
          </label>
        </form>
      </div>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js" />
      <Script src="/js/gsap.min.js" />
      <Script src="/js/send-btn.js" />
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const messages = await fetchMessages(getCookie("token", { req, res }), getCookie("name", { req, res }));
  const users = await User.find().exec();

  console.log(users);

  return {
    props: {
      messages: messages || [],
      users: JSON.stringify(users)
    }
  }
}
