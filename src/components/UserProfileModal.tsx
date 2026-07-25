import React from 'react';
import { User, ShieldCheck, Bookmark, Award, X, Trash2 } from 'lucide-react';
import { BookmarkItem, UserProfile } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  bookmarks,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <img src={profile.avatarUrl} alt={profile.name} className="w-14 h-14 rounded-2xl object-cover border border-purple-500/50" />
          <div>
            <h3 className="text-lg font-bold text-white">{profile.name}</h3>
            <p className="text-slate-400 font-mono text-[11px]">{profile.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-purple-600/30 text-purple-300 border border-purple-500/40 rounded text-[10px] font-semibold uppercase">
              {profile.role}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 my-6">
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 font-semibold">Total Scans</div>
            <div className="text-lg font-bold text-white font-mono mt-0.5">{profile.totalScans}</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 font-semibold">Threats Found</div>
            <div className="text-lg font-bold text-rose-400 font-mono mt-0.5">{profile.threatsDetected}</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 font-semibold">Security Score</div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{profile.personalSecurityScore}/100</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Security Badges & Achievements
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {profile.achievements.map((ach) => (
              <div key={ach.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 text-purple-400 rounded-lg">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">{ach.title}</div>
                  <div className="text-[10px] text-slate-400">{ach.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookmarks */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-purple-400" /> Bookmarked Threats ({bookmarks.length})
          </h4>
          {bookmarks.length === 0 ? (
            <p className="text-slate-500 italic p-3 bg-slate-950 rounded-xl text-[11px]">No bookmarked threats yet.</p>
          ) : (
            <div className="space-y-2">
              {bookmarks.map((bm) => (
                <div key={bm.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white font-mono break-all">{bm.target}</div>
                    <div className="text-[10px] text-slate-400">Risk Score: {bm.riskScore}% [{bm.riskLevel.toUpperCase()}]</div>
                  </div>
                  <button
                    onClick={() => onRemoveBookmark(bm.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
