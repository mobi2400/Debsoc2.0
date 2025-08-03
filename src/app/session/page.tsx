/* eslint-disable react/no-unescaped-entities */
"use client";
import { MotionItem } from "@/lib/motion";
import { motion } from "@/lib/motion";
import React, { useState, useEffect } from "react";

const getRandomMotions = (count = 1) => {
    const shuffled = [...motion].sort(() => 0.5 - Math.random());
    const numberOfItemsToSelect = Math.floor(Math.random() * count) + 1;
    return shuffled.slice(0, Math.min(numberOfItemsToSelect, motion.length));
};


export default function Session() {
     const [motions, setMotions] = useState<MotionItem[]>([]); 

    useEffect(() => {
        setMotions(getRandomMotions());
    }, []);

    return (
        <>
            <div className="bg-gradient-to-br from-black via-gray-900 to-black font-serif p-4 sm:p-8">
            <div className="w-full pt-6 pb-6 px-6 font-inter relative z-10">
            <div className=" bg-opacity-5 rounded-xl shadow-2xl p-6 md:p-10 lg:p-12 w-full max-w-screen-xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-white mb-10">
                    Random Motion Exercises
                </h1>

                {motions.length > 0 ? (
                    <div className="flex flex-col md:flex-row items-center justify-center">
                        {motions.map((m, i) => (
                            <div
                                key={i}
                                className=" p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 w-full md:w-[90%] max-w-5xl text-white"
                            >
                                <h2 className="text-2xl font-bold mb-2">{m.types}</h2>
                                <h3 className="text-xl font-semibold text-indigo-400 mb-4">
                                    {m.motion}
                                </h3>
                                <p className="text-gray-300 text-base leading-relaxed">
                                    {m.InfoSlide}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-300 text-lg">Loading random motions...</p>
                )}

                <div className="text-center mt-8">
                    <button
                        onClick={() => setMotions(getRandomMotions())}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 cursor-pointer "
                    >
                        New Motion
                    </button>
                </div>
            </div>
        </div>
      <div className="max-w-6xl w-full mx-auto bg-gray-900 shadow-xl rounded-lg overflow-hidden border-2 border-gray-700">
        <main className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-white">
          <section className="md:col-span-3 pb-4 border-b border-gray-700 mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-red-400 font-sans">
              Introduction to University Debating
            </h2>
            <p className="leading-relaxed text-gray-200 text-lg">
              University debating encompasses various formats, with British Parliamentary and Asian Parliamentary debating being prominent styles. These formats provide platforms for students to hone their critical thinking, public speaking, and analytical skills.
            </p>
          </section>

          <section className="md:col-span-2 border-r md:border-b-0 border-gray-700 pr-4 md:pr-6 pb-4 md:pb-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white font-sans">
              British Parliamentary Debating: A Deeper Dive
            </h2>
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-red-400">Structure:</h3>
              <ul className="list-disc list-inside ml-4 text-gray-200 leading-relaxed">
                <li>Four 2-membered teams:</li>
                <ul className="list-disc list-inside ml-8 mt-1">
                  <li>Opening Government | Opening Opposition</li>
                  <li>Closing Government | Closing Opposition</li>
                </ul>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-red-400">Speeches:</h3>
              <ul className="list-disc list-inside ml-4 text-gray-200 leading-relaxed">
                <li>8 x 7 minute speeches</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-red-400">Preparation Time:</h3>
              <ul className="list-disc list-inside ml-4 text-gray-200 leading-relaxed">
                <li>15 minutes</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-red-400">Speaker Order (Government vs. Opposition):</h3>
              <ol className="list-decimal list-inside ml-4 text-gray-200 leading-relaxed">
                <li>Prime Minister</li>
                <li>Leader of Opposition</li>
                <li>Deputy Prime Minister</li>
                <li>Deputy Leader of Opposition</li>
                <li>Government Whip</li>
                <li>Opposition Whip</li>
                <li>Opposition Reply</li>
                <li>Government Reply</li>
              </ol>
            </div>
          </section>
          <section className="md:col-span-1 pb-4 md:pb-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white font-sans">
              Asian Parliamentary Debating
            </h2>
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-red-400">Structure:</h3>
              <ul className="list-disc list-inside ml-4 text-gray-200 leading-relaxed">
                <li>3v3 - Government vs Opposition</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-red-400">Speeches:</h3>
              <ul className="list-disc list-inside ml-4 text-gray-200 leading-relaxed">
                <li>6 x 7 minute speeches + 2 x 4 minute reply speeches</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-red-400">Preparation Time:</h3>
              <ul className="list-disc list-inside ml-4 text-gray-200 leading-relaxed">
                <li>25 + 5 minute preparation time</li>
              </ul>
            </div>
          </section>

          <section className="md:col-span-3 pt-4 border-t border-gray-700 mt-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-red-400 font-sans">
              Common Elements & Strategic Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Points of Information (POIs):</h3>
                <ul className="list-disc list-inside ml-4 text-gray-200 leading-relaxed">
                  <li>Questions that the opposite bench can ask speakers during their speech.</li>
                  <li>Maximum time per POI: 15 seconds.</li>
                  <li>
                    <span className="font-bold">Protected Time:</span> Cannot ask POIs during the first and last minute of a 7-minute speech (i.e., POIs can be asked between 1 minute and 6 minutes).
                  </li>
                  <li>Strategic tool used by opening half teams to engage with closing half teams.</li>
                  <li>POIs are a feature of Asian Parliamentary Debating too.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Vetoes (for motions/topics):</h3>
                <ul className="list-disc list-inside ml-4 text-gray-200 leading-relaxed">
                  <li>Each round has 3 topics.</li>
                  <li>Teams rank motions based on strategic preferences.</li>
                  <li>Least preference = veto (i.e., motion will not be debated).</li>
                  <li><span className="font-bold">Scenarios:</span></li>
                  <ul className="list-disc list-inside ml-8 mt-1">
                    <li><span className="font-semibold">Both teams veto different motions:</span> Motion #1 ❌, Motion #2 ✅, Motion #3 ❌ (Motion #2 is debated)</li>
                    <li><span className="font-semibold">Both teams veto the same motion:</span> Motion #1 ❌❌, Motion #2, Motion #3
                      <ul className="list-disc list-inside ml-8 mt-1">
                        <li>If both teams have the same first preference, that motion is debated.</li>
                        <li>Else, coin toss to choose between #2 and #3.</li>
                      </ul>
                    </li>
                  </ul>
                </ul>
              </div>
            </div>
          </section>

        </main>

      </div> 
       <article className="max-w-6xl mx-auto p-10 text-white  leading-relaxed space-y-12">
      <header className="text-center border-b border-gray-300 pb-6 mb-10">
        <h1 className="text-5xl font-bold uppercase tracking-wider">Types of Motions</h1>
        <p className="text-lg italic mt-2 text-gray-600">A classical overview for debaters</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-2xl font-bold mb-3">This House regrets (THR):</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>The proposition is required to present the negative consequences of a particular event or trend and then present the world had that event or trend not happened.</li>
            <li>Opposition teams then have to explain why the event/trend was beneficial and why the alternative would have been worse.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">This House Believes (THB):</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>This is an analysis motion.</li>
            <li>A mechanism is generally not required.</li>
            <li>Arguments are for the truth or falsity of a particular statement.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">This House Supports/Opposes:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>This House Supports:</strong> Policy motions</li>
            <li><strong>This House Opposes:</strong> This House Regrets motion but in the present tense</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">This House as X:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Actor motions</li>
            <li>This motion requires all teams to look at the policy/event/trend from one specific point of view.</li>
            <li>Debaters are required to consider the best interests of the actor.</li>
          </ul>
        </section>

        <section className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-3">This House Would (THW):</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>This is a policy motion.</li>
            <li>The proposition is arguing for the passing of specific policy.</li>
            <li>Opening Government has a lot of latitude in deciding aspects of the policy:</li>
            <ul className="list-[circle] pl-8 space-y-1">
              <li>Who is implementing said policy</li>
              <li>Where it is being implemented in the policy</li>
            </ul>
          </ul>
        </section>
      </div>
    </article>
         <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-4xl font-bold mb-4 text-blue-400">Understanding Debate Motions</h2>
          <p className="mb-4 text-lg leading-relaxed">
            This article delves into the intricacies of debate motions, specifically dissecting "This House Believes That" (THBT) and "This House Would" (THW) formats. We'll also explore crucial concepts like "Mechanism" and "Fiat" that underpin effective argumentation.
          </p>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 border-b border-gray-600 pb-2">1. Types of Motions</h3>
            <ul className="list-disc list-inside ml-4">
              <li className="mb-1"><strong className="text-red-400">THBT = This House Believes That</strong></li>
              <li><strong className="text-red-400">THW = This House Would</strong></li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 border-b border-gray-600 pb-2">2. THBT = This House Believes That</h3>
            <ul className="list-disc list-inside ml-4 leading-relaxed">
              <li className="mb-2"><strong>Basic motion type:</strong> Argue for or against a given action/policy.</li>
              <li className="mb-2"><strong>Principle/Pragmatic:</strong> Explain why the action is moral, or why it has positive impacts on a specific actor/society.</li>
              <li><strong>Metrics:</strong> Set clear metrics to measure the harms and positive impacts of the action.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 border-b border-gray-600 pb-2">3. THW = This House Would</h3>
            <ul className="list-disc list-inside ml-4 leading-relaxed">
              <li className="mb-2"><strong>Would = Action:</strong> In 'THBT' motions you argue if a notion/value is right or wrong. A 'THW' motion requires each side to justify the action that is being carried out by the side.</li>
              <li><strong>Mechanism:</strong> Teams define a plan that achieves the outcome of the motion in order to defend the "how".</li>
            </ul>
          </div>

          <div className="">
            <h3 className="text-2xl font-semibold mb-3 border-b border-gray-600 pb-2">4. What is Fiat?</h3>
            <p className="mb-2 leading-relaxed">
              <strong className="text-red-400">Fiat</strong> = scope of the assumptions and claims that each side can make within reasonable boundaries.
            </p>
            <ul className="list-disc list-inside ml-4 leading-relaxed">
              <li className="mb-2">While drafting policies, both sides make reasonable assumptions about how much they can change and how different actors respond to that change.</li>
              <li className="mb-2">When proposition claims that they can regulate drug sales to prevent overdoses, opposition cannot question it until there is logical analysis to refute it.</li>
              <li>To ensure fairness, opposition can exercise the same amount of fiat i.e. they have the ability to crack down on blackmarkets to the same extent as drug dispensaries are regulated.</li>
            </ul>
          </div>
        </section>

        <aside className="md:col-span-1 space-y-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h3 className="text-2xl font-semibold mb-3 text-green-400">5. Example Motion: THBT all professional sports teams should be majority fan-owned</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm leading-relaxed">
              <div>
                <h4 className="font-bold mb-1">What should gov prove?</h4>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1">Why do fans have a legitimate stake in the ownership of sports teams?</li>
                  <li>Why does the quality of grassroots sports improve when fans own a sports team?</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-1">What should opp prove?</h4>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1">Why does private ownership mean more capital for sports teams?</li>
                  <li>Why is more money good for (a) individual teams and by extension their fans (b) for sport itself?</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h3 className="text-2xl font-semibold mb-3 text-purple-400">6. Example Motion: THW legalise all class C drugs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm leading-relaxed">
              <div>
                <h4 className="font-bold mb-1">Government Model:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1">Removal of all drug related offences from criminal prosecution.</li>
                  <li>Regulated drug dispensaries with strict limits for individuals as determined by a doctor.</li>
                </ul>
                <p className="mt-2 text-xs italic">
                  <strong className="text-gray-500">Context:</strong> In cities with thriving drug black markets and overdose deaths, this regulated access saves lives and offers cheaper prices to undercut the black market.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-1">Opposition Alternative:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1">Stricter drug control through better policing & fairer CJS reforms over time.</li>
                  <li>Identify at-risk individuals in schools, through the social security system to provide therapy prior to addiction and rehab if addicted.</li>
                </ul>
                <p className="mt-2 text-xs italic">
                  <strong className="text-gray-500">Context:</strong> Legalising drugs, increases access and chance of addiction; craving for harder drugs - more OD deaths.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h3 className="text-2xl font-semibold mb-3 text-orange-400">7. Motions to think about!</h3>
            <div className="mb-4">
              <h4 className="font-bold mb-1">THBT motions:</h4>
              <ul className="list-disc list-inside ml-4 text-sm leading-relaxed">
                <li className="mb-1">THBT environmental activists should advocate for nuclear power</li>
                <li className="mb-1">THBT the West should look to establish diplomatic relationships with the Taliban government</li>
                <li>THBT Queer movements in progressive nations should focus their campaigning on family friendly content as opposed to sexual liberation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-1">THW motions:</h4>
              <ul className="list-disc list-inside ml-4 text-sm leading-relaxed">
                <li className="mb-1">THW allow companies to buy the rights to economically failing cities</li>
                <li className="mb-1">THW make a minimum educational qualification mandatory for politicians being nominated for positions in the cabinet</li>
                <li>THW eliminate all patents resulting from scientific research that was entirely publicly funded</li>
              </ul>
            </div>
          </div>
        </aside>
      </main>
            <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-4xl font-bold mb-4 text-blue-400">Understanding More Debate Motion Types</h2>
          <p className="mb-4 text-lg leading-relaxed">
            This article expands on debate motions, introducing "This House, as X" (TH, as X), "This House Regrets" (THR), and "This House Supports/Opposes" (THS/THO) formats, providing deeper insights into their unique argumentative requirements.
          </p>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 border-b border-gray-600 pb-2">1. Types of Motions</h3>
            <ul className="list-disc list-inside ml-4">
              <li className="mb-1"><strong className="text-red-400">This House, as X</strong></li>
              <li className="mb-1"><strong className="text-red-400">THR = This House Regrets</strong></li>
              <li><strong className="text-red-400">THS/THO = This House Supports/Opposes</strong></li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 border-b border-gray-600 pb-2">2. This House, as X, would do...</h3>
            <ul className="list-disc list-inside ml-4 leading-relaxed">
              <li className="mb-2"><strong>"As X"</strong>: X often refers to the specific actor who is either carrying out the policy or who's interests must be fulfilled.</li>
              <li><strong>Incentives</strong>: Every action is motivated by a need to reach a specific end goal that is beneficial for the actor. Teams must explain what the end goal is, why this is the most important end goal for the actor, and how exactly it gets achieved.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 border-b border-gray-600 pb-2">3. Example Motion: TH, as women from privileged backgrounds, will turn down benefits arising from affirmative action programmes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm leading-relaxed">
              <div>
                <h4 className="font-bold mb-1">Gov Incentives:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1">As someone who was brought up in a rich and connected family by lottery of birth, it feels morally wrong to take away the opportunities from people that actually need it.</li>
                  <li className="mb-1">Even if she reaches top leadership positions, it will be viewed as a function of the quota rather than her talent.</li>
                  <li>The guilt and lack of respect will make it harder for her to work effectively.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-1">Opp Incentives:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1">Privilege does not guarantee success, especially in professions dominated by old boy's clubs and historically led by men.</li>
                  <li className="mb-1">Therefore, affirmative action policies greatly increase the chances of them reaching top leadership positions.</li>
                  <li>They can then leverage their power and authority to expand the access to opportunities to all women.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 border-b border-gray-600 pb-2">4. THR = This House Regrets</h3>
            <ul className="list-disc list-inside ml-4 leading-relaxed">
              <li className="mb-2"><strong>Retrospective</strong>: Evaluate past actions based on their impacts in the present, and analyze why this was beneficial or detrimental for certain actors.</li>
              <li><strong>Counterfactual</strong>: Teams that regret the motion must provide reasoning about:
                <ul className="list-circle list-inside ml-4 mt-1">
                  <li className="mb-1">What the alternative could have been in the absence of this virtue or notion.</li>
                  <li className="mb-1">Why it is the most likely alternative.</li>
                  <li>How different would their world be.</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <aside className="md:col-span-1 space-y-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h3 className="text-2xl font-semibold mb-3 text-green-400">5. Example Motion: THR the rise of social media as being the primary source of news</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm leading-relaxed">
              <div>
                <h4 className="font-bold mb-1">Gov Burden:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1"><strong>Alternative?</strong>
                    <ul className="list-circle list-inside ml-4 mt-1">
                      <li className="mb-1">Traditional media sources, with a greater digital presence.</li>
                      <li>Innovative new age media - Vox, Axios, The Athletic.</li>
                    </ul>
                  </li>
                  <li><strong>How has this rise changed news consumption?</strong>
                    <ul className="list-circle list-inside ml-4 mt-1">
                      <li className="mb-1">Most people reading trending tweets, Instagram posts to be informed about facts.</li>
                      <li>News becoming less analytical and more anecdotal.</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-1">Opp Burden:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1"><strong>How would the world have been in the absence of social media?</strong>
                    <ul className="list-circle list-inside ml-4 mt-1">
                      <li className="mb-1">Lesser access - scale (1 billion Facebook users vs 5 million NYTimes readers) and the nature of news published.</li>
                      <li>Local news/information will not be as accessible - this has max utility.</li>
                    </ul>
                  </li>
                  <li>Mitigate the negative effects of social media in current society but cannot argue different policies that can fix it.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h3 className="text-2xl font-semibold mb-3 text-purple-400">6. THS/O = This House Supports/Opposes</h3>
            <ul className="list-disc list-inside ml-4 leading-relaxed">
              <li className="mb-2"><strong>Burden</strong>: Argue why a certain action is right or wrong based on evidence.</li>
              <li><strong>How is this different from THBT/THW?</strong>
                <ul className="list-circle list-inside ml-4 mt-1">
                  <li className="mb-1">THBT = policy i.e. teams can design new solutions to mitigate problems vs THO = teams must show the efficiency of existing policies.</li>
                  <li>Teams MUST set up a counterfactual in these motions.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h3 className="text-2xl font-semibold mb-3 text-orange-400">7. Example Motion: THS non-violent property damage in order to stop climate change</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm leading-relaxed">
              <div>
                <h4 className="font-bold mb-1">Gov Burden:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1"><strong>How does it look like?</strong>
                    <ul className="list-circle list-inside ml-4 mt-1">
                      <li className="mb-1">Blowing up pipelines, sabotaging logging equipment.</li>
                      <li>Meant to suspend operations temporarily and abruptly, causing losses.</li>
                    </ul>
                  </li>
                  <li><strong>When can we support this?</strong>
                    <ul className="list-circle list-inside ml-4 mt-1">
                      <li className="mb-1">Brings popular attention to forgotten climate issues.</li>
                      <li>In the long term, increase costs for polluting companies, which leads to suspending production or becoming cleaner.</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-1">Opp Burden:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1"><strong>Counterfactual</strong>: civil protests, lawsuits, support activist investors and back politicians that push for greener policies/stricter controls.</li>
                  <li className="mb-1"><strong>Tradeoff?</strong> Takes time in order to effect change, but saves the reputation environmental organisations and keeps an open channel of negotiation rather than confrontation.</li>
                  <li><strong>Why oppose this?</strong> Unlikely to change behavior, at the cost of more environmental damage, and being portrayed as violent on popular media.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h3 className="text-2xl font-semibold mb-3 text-red-400">8. Motions to think about!</h3>
            <ul className="list-disc list-inside ml-4 leading-relaxed">
              <li className="mb-2"><strong>TH, as the IOC, would allow athletes to use performance-enhancing drugs in the Olympics</strong>
                <p className="text-xs italic text-gray-500 ml-4">(Think about how this is different from THW legalise performance-enhancing drugs)</p>
              </li>
              <li className="mb-2"><strong>TH, as the Biden Administration, would not have withdrawn from Afghanistan</strong>
                <p className="text-xs italic text-gray-500 ml-4">(This House Opposes Joe Biden's decision to withdraw American troops from Afghanistan)</p>
              </li>
              <li className="mb-2">THR the characterisation of greed as immoral</li>
              <li className="mb-2">THR the rising trend in pop culture to portray villains as a victim of society</li>
              <li className="mb-2">THR the increasing disinvestment in Public Sector Undertakings in India</li>
              <li className="mb-2">THS the existence of a technology that lets people see the alternative outcomes of major life decisions they have made</li>
              <li className="mb-2">THO states offering to make reparations through the acceptance of refugees</li>
              <li>THO the glorification of resilience as a positive trait</li>
            </ul>
          </div>
        </aside>
      </main>
      </div>
    </>
    );
}