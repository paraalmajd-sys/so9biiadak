import React from 'react';
import { Story } from '../types';
import { Plus, Flame, Eye } from 'lucide-react';

interface StoryReelsProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onOpenCreateAd: () => void;
}

export const StoryReels: React.FC<StoryReelsProps> = ({
  stories,
  onSelectStory,
  onOpenCreateAd,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-xs mb-4">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>ستوريات العروض الحية اليوم (Flash Deals)</span>
        </div>
        <span className="text-[11px] text-slate-400">انقر للمشاهدة والطلب</span>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {/* Create your own ad story */}
        <button
          onClick={onOpenCreateAd}
          className="group flex-shrink-0 w-28 h-44 rounded-xl relative overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 hover:border-blue-500 transition-all flex flex-col justify-between p-2 cursor-pointer text-center"
        >
          <div className="w-9 h-9 mx-auto mt-4 rounded-full bg-blue-600 group-hover:scale-110 transition-transform flex items-center justify-center text-white shadow-xs">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              أضف إعلانك
            </span>
            <span className="text-[10px] text-slate-500 block">
              ستوري مجاني
            </span>
          </div>
        </button>

        {/* Stories list */}
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="group flex-shrink-0 w-28 h-44 rounded-xl relative overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer text-right"
          >
            {/* Background image */}
            <img
              src={story.image}
              alt={story.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Dark gradient scrim for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

            {/* Avatar with ring at top */}
            <div className="absolute top-2 right-2">
              <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-rose-500">
                <img
                  src={story.brandAvatar}
                  alt={story.brandName}
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Discount kicker tag at top left */}
            <div className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              {story.discount}
            </div>

            {/* Bottom details */}
            <div className="absolute bottom-2 right-2 left-2 text-white">
              <div className="flex items-center gap-1 text-[10px] text-slate-300 mb-0.5">
                <Eye className="w-3 h-3" />
                <span className="tabular-nums">{story.views}</span>
              </div>
              <p className="text-[11px] font-bold leading-tight line-clamp-2 drop-shadow-sm">
                {story.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
