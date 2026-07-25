import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RefreshCw, HelpCircle, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../lib/mockData';

interface GamifiedLearningProps {
  userScore: number;
  onUpdateScore: (newScore: number) => void;
}

export const GamifiedLearning: React.FC<GamifiedLearningProps> = ({ userScore, onUpdateScore }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const q = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === q.correctIndex) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      const bonus = Math.round((correctAnswersCount / QUIZ_QUESTIONS.length) * 15);
      onUpdateScore(Math.min(userScore + bonus, 100));
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-800/40 rounded-2xl p-6 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">
            <Trophy className="w-4 h-4 text-amber-400" /> Cyber Defense Academy
          </div>
          <h2 className="text-2xl font-black text-white">Gamified Phishing Defense Training</h2>
          <p className="text-xs text-slate-400 mt-1">Test your skill in detecting typosquatting, quishing, and email social engineering to boost your security rating.</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Personal Security Score</div>
            <div className="text-xl font-black text-amber-400 font-mono">{userScore}/100</div>
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      {!quizFinished ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Score: {correctAnswersCount} Correct
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-snug">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let optionStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-purple-500/50';

              if (isAnswerSubmitted) {
                if (idx === q.correctIndex) {
                  optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                } else if (idx === selectedOption) {
                  optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                }
              } else if (selectedOption === idx) {
                optionStyle = 'bg-purple-600/30 border-purple-500 text-white font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all leading-relaxed ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-slate-500 font-bold">{String.fromCharCode(65 + idx)}.</span>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswerSubmitted && (
            <div className="mt-6 p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2">
              <div className="font-bold text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Cyber Defense Explanation:
              </div>
              <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6 flex justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl transition-all disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all"
              >
                {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question →' : 'View Results'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Screen */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
          <div className="p-4 bg-purple-600/20 rounded-full w-fit mx-auto border border-purple-500/30 text-purple-400">
            <Trophy className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-white">Quiz Challenge Completed!</h3>
          <p className="text-sm text-slate-300">
            You scored <span className="font-bold text-emerald-400">{correctAnswersCount}</span> out of {QUIZ_QUESTIONS.length} correct.
          </p>
          <p className="text-xs text-slate-400">
            Your personal security rating has been boosted to <span className="font-mono text-purple-300">{userScore}/100</span>!
          </p>

          <button
            onClick={handleRestartQuiz}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all"
          >
            Retake Quiz Challenge
          </button>
        </div>
      )}
    </div>
  );
};
