import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProjectHealth({ projects }) {
  const healthCounts = {
    onTrack: projects.filter(p => p.healthStatus === 'on-track').length,
    needsAttention: projects.filter(p => p.healthStatus === 'needs-attention').length,
    atRisk: projects.filter(p => p.healthStatus === 'at-risk').length,
  };

  const totalProgress = Math.round(
    projects.reduce((acc, p) => acc + p.progress, 0) / projects.length
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 h-full shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">Project Health</h3>
          <p className="text-sm text-gray-500">Overall status of your projects</p>
        </div>
        <div className="text-2xl font-bold text-[#2A6BFF]">{totalProgress}%</div>
      </div>

      {/* Health Traffic Light */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className={cn(
          "text-center p-3 rounded-lg border-2 transition-all border-gray-200 bg-gray-50"
        )}>
          <p className=" mb-3 text-2xl font-bold text-gray-900">{healthCounts.atRisk}</p>
          <p className="text-xs text-gray-600">At Risk</p>
        </div>
        
        <div className={cn(
          "text-center p-3 rounded-lg border-2 transition-all border-gray-200 bg-gray-50 "
        )}>
          <p className="mt-3 text-2xl font-bold text-gray-900">{healthCounts.needsAttention}</p>
          <p className="text-xs text-gray-600">Attention</p>
        </div>
        
        <div className="text-center p-3 rounded-lg border-2 transition-all border-gray-200 bg-gray-50">
          <p className="mt-3 text-2xl font-bold text-gray-900">{healthCounts.onTrack}</p>
          <p className="text-xs text-gray-600">On Track</p>
        </div>
      </div>

      {/* Weekly Progress */}
      <div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Weekly Progress</span>
          <span className="font-medium text-green-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +12%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#2A6BFF]"
            style={{ width: '68%' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>24 tasks completed</span>
          <span>11 remaining</span>
        </div>
      </div>
    </div>
  );
}