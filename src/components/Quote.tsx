import React, {useEffect, useState} from "react";
import Image from "next/image";

function Quote() {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(false);

  const staticQuotes = [
    {
      content: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      content: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
    },
    {
      content:
        "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon",
    },
    {
      content:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      content:
        "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
    },
    {
      content: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
    },
    {
      content:
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      content: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
    {
      content: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde",
    },
    {
      content:
        "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
      author: "Albert Einstein",
    },
    {
      content: "A room without books is like a body without a soul.",
      author: "Marcus Tullius Cicero",
    },
    {
      content:
        "In three words I can sum up everything I've learned about life: it goes on.",
      author: "Robert Frost",
    },
    {
      content:
        "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
      author: "J.K. Rowling",
    },
    {
      content:
        "Don't walk in front of me… I may not follow. Don't walk behind me… I may not lead. Walk beside me… just be my friend.",
      author: "Albert Camus",
    },
    {
      content:
        "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.",
      author: "Martin Luther King Jr.",
    },
    {
      content:
        "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      author: "Mahatma Gandhi",
    },
    {
      content:
        "A friend is someone who knows all about you and still loves you.",
      author: "Elbert Hubbard",
    },
    {
      content:
        "To live is the rarest thing in the world. Most people just exist.",
      author: "Oscar Wilde",
    },
    {
      content:
        "I have not failed. I've just found 10,000 ways that won't work.",
      author: "Thomas A. Edison",
    },
    {
      content:
        "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
    },
    {
      content:
        "Your time is limited, so don't waste it living someone else's life.",
      author: "Steve Jobs",
    },
    {
      content:
        "Whether you think you can or you think you can't, you're right.",
      author: "Henry Ford",
    },
    {
      content:
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
    },
    {
      content: "The journey of a thousand miles begins with one step.",
      author: "Lao Tzu",
    },
    {
      content: "That which does not kill us makes us stronger.",
      author: "Friedrich Nietzsche",
    },
    {
      content: "Life is really simple, but we insist on making it complicated.",
      author: "Confucius",
    },
    {
      content: "May you live all the days of your life.",
      author: "Jonathan Swift",
    },
    {
      content: "Life itself is the most wonderful fairy tale.",
      author: "Hans Christian Andersen",
    },
    {
      content:
        "Do not go where the path may lead, go instead where there is no path and leave a trail.",
      author: "Ralph Waldo Emerson",
    },
    {
      content: "You miss 100% of the shots you don't take.",
      author: "Wayne Gretzky",
    },
  ];

  useEffect(() => {
    async function fetchQuote() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch("https://api.quotable.io/random", {
          signal: controller.signal,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.content && data.author) {
          setQuote(data.content);
          setAuthor(data.author);
          setError(false);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        console.log("API fetch failed, using static quote:", errorMessage);

        const randomQuote =
          staticQuotes[Math.floor(Math.random() * staticQuotes.length)];
        setQuote(randomQuote.content);
        setAuthor(randomQuote.author);
        setError(true);
      }
    }

    fetchQuote();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-md rounded-3xl border border-orange-500 p-10 grid grid-cols-1 md:grid-cols-2 gap-6 transition-shadow duration-500 delay-100 ease-in-out hover:shadow-[0_0_30px_#f97316]">
        <div className="flex flex-col justify-center">
          <h2 className="text-orange-500 text-2xl font-bold mb-6">
            QUOTE OF THE DAY
          </h2>

          <blockquote className="text-white text-xl italic leading-relaxed border-l-4 border-orange-500 pl-4 mb-4">
            "{quote}"
          </blockquote>

          {author && (
            <p className="text-orange-300 text-lg font-medium pl-4">
              — {author}
            </p>
          )}

          {error && (
            <p className="text-red-400 mt-4 text-sm">
              API limit reached. Showing cached content.
            </p>
          )}
        </div>

        <div className="hidden md:block">
          <img
            src="./quote-image.jpg"
            alt="Quote"
            className="w-full h-64 object-cover rounded-xl border border-orange-500"
          />
        </div>
      </div>
    </section>
  );
}

export default Quote;
