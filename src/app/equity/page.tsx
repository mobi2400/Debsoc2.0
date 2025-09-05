"use client";
import { equityTeam } from '@/lib/equityData';
import Navbar from "@/components/Navbar";
import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const EquityPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-300 font-sans">
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-orange-500 mb-4">
                Equity Policy Document
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ensuring a respectful, inclusive, and safe environment for all members of the SMVIT Debating Society.
              </p>
            </header>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl">
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-orange-500 pb-2">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  {equityTeam.map((member, index) => (
                    <div 
                      key={index} 
                      className={`bg-gray-900/70 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-orange-500/50 transition-all ${
                        member.name === 'Nainika' ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <h3 className="text-xl font-semibold text-orange-400 mb-2">{member.name}</h3>
                      <p className="text-gray-400">{member.role}</p>
                      <div className="flex items-center text-gray-400 mt-3">
                        <Mail className="w-4 h-4 mr-2 text-orange-400" />
                        <a href={`mailto:${member.email}`} className="hover:underline">{member.email}</a>
                      </div>
                      <div className="flex items-center text-gray-400 mt-1">
                        <Phone className="w-4 h-4 mr-2 text-orange-400" />
                        <a href={`tel:${member.phone}`} className="hover:underline">{member.phone}</a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                    <a href="https://forms.gle/frVqWMQumrPYKdPL6" target="_blank" rel="noopener noreferrer" 
                       className="inline-flex items-center justify-center text-orange-400 hover:text-orange-300 font-medium transition-colors duration-300 bg-gray-800/70 border border-gray-700 rounded-lg px-6 py-3">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Anonymous Complaint Form
                    </a>
                </div>
              </section>

              <section className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-orange-500 pb-2">1. Preamble</h2>
                  <div className="space-y-4 text-gray-300">
                    <h3 className="text-2xl font-semibold text-orange-400">1.1 Purpose</h3>
                    <p>This Equity Policy is instituted by the SMVIT Debating Society to ensure a respectful, inclusive, and safe environment for all individuals participating in any activities organized, facilitated, or affiliated with the Society.</p>
                    <p>This Policy operates as a foundational instrument of governance for the internal conduct of the Society&apos;s members and participants, and applies uniformly without exception. The Policy is predicated on the principle that debating, as an intellectual pursuit, must remain free from discrimination, harassment, intimidation, or any conduct that undermines the dignity or equitable participation of any individual.</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-orange-400">1.2 Background and Principles</h3>
                  <p className="text-gray-300">The Society recognizes that inter-personal dynamics within competitive and academic spaces are often shaped by pre-existing social structures and inequities. This Policy is rooted in the following principles:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                    <li><strong>Dignity and Equality:</strong> Every participant is entitled to an environment of mutual respect.</li>
                    <li><strong>Accessibility and Inclusion:</strong> The Society will undertake all reasonable efforts to ensure its activities are accessible to all.</li>
                    <li><strong>Impact Over Intent:</strong> In adjudicating violations, the focus shall be on the impact of the conduct, regardless of intent.</li>
                    <li><strong>Restorative and Educational Objectives:</strong> The Society is committed to rehabilitation, mediation, and using equity as an educational tool.</li>
                    <li><strong>Prevention and Proactivity:</strong> Equity is a proactive standard, and the Society will cultivate a culture where violations are less likely to arise.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-orange-500 pb-2">2. Scope of Application</h2>
                  <div className="space-y-4 text-gray-300">
                    <h3 className="text-2xl font-semibold text-orange-400">2.1 Applicability</h3>
                    <p>This Policy applies to all persons involved with the SMVIT Debating Society, including members, adjudicators, trainers, guest speakers, committee members, volunteers, and external participants.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-orange-500 pb-2">3. Prohibited Conduct</h2>
                   <div className="space-y-4 text-gray-300">
                    <p>All individuals subject to this Policy shall refrain from engaging in any form of conduct that constitutes a breach of equity principles. Prohibited behaviors include, but are not limited to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Harassment</li>
                        <li>Bullying</li>
                        <li>Discrimination</li>
                        <li>Intimidation</li>
                        <li>Sexual Harassment</li>
                        <li>Vilification</li>
                        <li>Victimisation</li>
                        <li>Use of Inflammatory or Triggering Language</li>
                        <li>Technology Misuse (unauthorized research, recording without consent, etc.)</li>
                    </ul>
                   </div>
                </div>
                
                <div className="text-center mt-10">
                    <p className="text-gray-400">For a full detailed breakdown of the policy, please refer to the official document.</p>
                    <a href="https://docs.google.com/document/d/19n0b12q1CR2nZ31v1m2s8a4i8y6x4m2s/edit?usp=sharing&ouid=112345678901234567890&rtpof=true&sd=true" 
                       target="_blank" rel="noopener noreferrer" 
                       className="inline-flex items-center justify-center text-orange-400 hover:text-orange-300 font-medium transition-colors duration-300 mt-2">
                      View Full Policy Document
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                </div>

              </section>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default EquityPolicy;