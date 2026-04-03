import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Users, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ExternalLink,
  Play,
  Calendar,
  ShieldCheck,
  Briefcase,
  Layers,
  ArrowUpRight,
  Info,
  Edit3,
  Send,
  ChevronRight,
  Download,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AssetReviewProps {
  data: any;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onSubmitToAdmin: (id: string) => void;
  onEdit: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

const Section = ({ title, children, badge }: { title: string, children: React.ReactNode, badge?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6"
  >
    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
      <h3 className="font-bold text-slate-800 tracking-tight">{title}</h3>
      {badge && (
        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-md uppercase tracking-wider">
          {badge}
        </span>
      )}
    </div>
    <div className="p-5 sm:p-6">
      {children}
    </div>
  </motion.div>
);

const DataItem = ({ label, value, subValue, highlight = false }: { label: string, value: string | number, subValue?: string, highlight?: boolean }) => (
  <div className="group p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className={`text-sm font-bold ${highlight ? 'text-indigo-600' : 'text-slate-900'}`}>
        {value}
      </span>
      {subValue && <span className="text-[10px] text-slate-400 font-medium">{subValue}</span>}
    </div>
  </div>
);

/** Safe label for on-chain address — API shape varies; never render non-primitives as React children. */
function getAssetContractAddressLabel(d: Record<string, unknown>): string {
  const chain = d.blockchain;
  let nested: unknown;
  if (chain != null && typeof chain === 'object') {
    nested = (chain as { assetAddress?: unknown }).assetAddress;
  }
  const raw = nested ?? d.blockchainProjectAddress ?? d.assetAddress;
  if (raw == null || raw === '') return '—';
  if (typeof raw === 'string' || typeof raw === 'number') return String(raw);
  if (typeof raw === 'object' && raw !== null && 'address' in raw && typeof (raw as { address: unknown }).address === 'string') {
    return (raw as { address: string }).address;
  }
  return '—';
}

const LegalDocCard = ({ title, doc, status = 'Verified' }: { title: string, doc: any, status?: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5 transition-all gap-4">
    <div className="flex items-center gap-4">
      <div>
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">{doc.name}</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase">
            <CheckCircle2 size={10} /> {status}
          </span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <a 
        href={doc.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-colors border border-slate-200"
      >
        <Download size={14} /> View
      </a>
    </div>
  </div>
);

export const AssetReview: React.FC<AssetReviewProps> = ({
  data,
  isLoading,
  isError,
  errorMessage,
  onSubmitToAdmin,
  onEdit,
  onReject,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'legal' | 'tenants'>('overview');
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: data.currency,
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-4 px-4">
        <div className="h-10 w-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
        <p className="text-sm font-semibold text-slate-600">Loading asset…</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-3 px-4 text-center">
        <AlertCircle className="text-rose-500" size={40} />
        <h1 className="text-lg font-black text-slate-900">Could not load asset</h1>
        <p className="text-sm text-slate-600 max-w-md">
          { 'The asset may not exist or you may not have access.'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Top Banner - Role Indicator */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <ShieldCheck size={12} className="text-indigo-400" /> Reviewer Mode • Internal Use Only
        </p>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-20 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                <Building2 size={24} />
              </div>
              <div>
                <h1 className="text-lg font-black text-slate-900 tracking-tight">{data.name}</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1 text-[10px] font-black text-indigo-600 uppercase tracking-wider">
                    ID: {data._id.slice(-6)}
                  </span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {data.city}, {data.state}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => onEdit(data._id)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
              >
                <Edit3 size={16} /> Edit
              </button>
              <button 
                onClick={() => onSubmitToAdmin(data._id)}
                className="flex-[2] sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
              >
                <Send size={16} /> Submit to Admin
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Navigation Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-2">
            <nav className="sticky top-28 space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: Info },
                { id: 'financials', label: 'Financials', icon: TrendingUp },
                { id: 'legal', label: 'Legal', icon: Scale },
                { id: 'tenants', label: 'Tenants', icon: Users },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon size={16} />
                  <span className="uppercase tracking-wider">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Middle Column - Main Content */}
          <div className="lg:col-span-6 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Section title="Asset Overview" badge={data.category}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <DataItem label="Asset Class" value={data.class} />
                      <DataItem label="Style" value={data.style} />
                      <DataItem label="Stage" value={data.stage.replace('-', ' ')} />
                      <DataItem label="Total Area" value={`${data.totalNumberOfSfts} SFT`} />
                      <DataItem label="Currency" value={data.currency} />
                      <DataItem label="Instrument" value={data.instrumentType} />
                    </div>
                    <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Project Description</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{data.about}</p>
                    </div>
                  </Section>

                  <Section title="Location & Media">
                    <div className="grid grid-cols-1 gap-6 mb-6">
                      <div className="space-y-4">
                        <DataItem label="Full Address" value={`${data.landmark}, ${data.city}, ${data.state}, ${data.country}`} />
                        <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative group">
                          <img 
                            src={data.media.imageURL} 
                            alt="Main" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[8px] font-bold rounded uppercase tracking-widest">
                            Primary Asset Image
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                          <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white mb-4 border border-white/20">
                              <Play size={24} fill="currentColor" />
                            </div>
                            <p className="text-white text-sm font-bold mb-2">Virtual Tour Video</p>
                            <a 
                              href={data.media.videoURL} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              OPEN ON YOUTUBE <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {data.media.gallery.map((img: string, i: number) => (
                            <div key={i} className="aspect-square rounded-xl overflow-hidden border border-slate-200">
                              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Section>
                </motion.div>
              )}

              {activeTab === 'financials' && (
                <motion.div
                  key="financials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Section title="Yield & Returns">
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <DataItem label="Net Rental Yield" value={`${data.investmentPerformance.netRentalYield}%`} highlight />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <DataItem label="Gross Yield" value={`${data.investmentPerformance.grossRentalYield}%`} />
                        <DataItem label="Target Appr." value={`${data.investmentPerformance.targetCapitalAppreciation}%`} />
                        <DataItem label="IRR" value={`${data.investmentPerformance.irr}%`} />
                        <DataItem label="MOIC" value={data.investmentPerformance.moic.toFixed(2)} />
                      </div>
                    </div>
                  </Section>

                  <Section title="Valuation">
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <DataItem label="Total Property Value" value={formatCurrency(data.totalPropertyValueAfterFees)} highlight />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <DataItem label="Base Value" value={formatCurrency(data.basePropertyValue)} />
                        <DataItem label="Price / SFT" value={formatCurrency(data.pricePerSft)} />
                      </div>
                    </div>
                  </Section>

                  <Section title="Tokenomics">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <DataItem label="Symbol" value={data.tokenInformation.tokenSymbol} />
                      <DataItem label="Supply" value={data.tokenInformation.tokenSupply} />
                      <DataItem label="Price" value={formatCurrency(data.tokenInformation.tokenPrice)} highlight />
                      <DataItem label="Available" value={data.tokenInformation.availableTokensToBuy} />
                    </div>
                  </Section>
                </motion.div>
              )}

              {activeTab === 'legal' && (
                <motion.div
                  key="legal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Section title="Compliance & Legal Documents">
                    <div className="grid grid-cols-1 gap-4">
                      <LegalDocCard title="Property Legal Advisory" doc={data.legalAdivisory.document} />
                      <LegalDocCard title="Asset Management Agreement" doc={data.assetManagementCompany.document} />
                      <LegalDocCard title="Rental Distribution Report" doc={data.brokerage.document} />
                    </div>
                  </Section>

                  <div className="grid grid-cols-1 gap-6">
                    <Section title="Issuer Profile">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {data.issuer.firstName[0]}{data.issuer.lastName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{data.issuer.firstName} {data.issuer.lastName}</p>
                            <p className="text-xs text-slate-500">{data.issuer.email}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <DataItem label="Phone" value={data.issuer.phoneNumber} />
                          <DataItem label="KYC Status" value={data.issuer.kycStatus} highlight />
                        </div>
                      </div>
                    </Section>

                    <Section title="SPV Details">
                      <div className="space-y-4">
                        <DataItem label="Company Name" value={data.company.name} />
                        <DataItem label="SPV ID" value={data.spvId.slice(-8)} />
                        <DataItem label="Currency" value={data.company.currency} />
                      </div>
                    </Section>
                  </div>
                </motion.div>
              )}

              {activeTab === 'tenants' && (
                <motion.div
                  key="tenants"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Section title="Lease Management">
                    <div className="grid grid-cols-1 gap-4">
                      {data.tenants.map((tenant: any) => (
                        <div key={tenant._id} className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 transition-all">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <div>
                                <h4 className="text-sm font-bold text-slate-900">{tenant.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{tenant.type} Tenant</p>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                              {tenant.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-50">
                            <DataItem label="Rent/SFT" value={formatCurrency(tenant.rentPerSft)} />
                            <DataItem label="Allocated" value={`${tenant.sftsAllocated} SFT`} />
                            <DataItem label="Escalation" value={`${tenant.annualRentEscalation}%`} />
                            <DataItem label="Expiry" value={formatDate(tenant.endDate)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Sidebar Summary */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="sticky top-28 space-y-6">
              <Section title="Review Summary">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs font-bold text-slate-500 uppercase">Total Raised</span>
                    <span className="text-sm font-black text-slate-900">{formatCurrency(data.totalFundsRaised)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs font-bold text-slate-500 uppercase">Investors</span>
                    <span className="text-sm font-black text-slate-900">{data.investors.length} Verified</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
                      <span>Funding Progress</span>
                      <span>{((data.totalFundsRaised / data.totalPropertyValueAfterFees) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.totalFundsRaised / data.totalPropertyValueAfterFees) * 100}%` }}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Fee Breakdown">
                <div className="space-y-3">
                  {(Object.entries(data.fees) as [string, Array<{ name: string; value: number; isPercentage: boolean }>][]).map(([key, items]: [string, Array<{ name: string; value: number; isPercentage: boolean }>]) => (
                    items.length > 0 && (
                      <div key={key} className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 capitalize">{key} Fees</span>
                        <span className="font-bold text-slate-900">
                          {items.reduce((acc, curr) => acc + (curr.isPercentage ? (curr.value / 100) * data.basePropertyValue : curr.value), 0).toLocaleString('en-IN', { style: 'currency', currency: data.currency })}
                        </span>
                      </div>
                    )
                  ))}
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-black text-slate-900 uppercase">Total Fees</span>
                    <span className="text-sm font-black text-indigo-600">
                      {formatCurrency(data.totalPropertyValueAfterFees - data.basePropertyValue)}
                    </span>
                  </div>
                </div>
              </Section>

              <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck size={20} className="text-indigo-400" />
                    <h3 className="font-black text-sm uppercase tracking-widest">On-Chain Data</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Asset Contract</p>
                      <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <code className="text-[10px] font-mono text-indigo-300 truncate mr-2">
                          {getAssetContractAddressLabel(data as Record<string, unknown>)}
                        </code>
                        <button className="text-slate-400 hover:text-white transition-colors">
                          <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 uppercase tracking-widest">
                      Verify Smart Contract
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-2 flex justify-between items-center shadow-2xl border border-white/10">
          {[
            { id: 'overview', label: 'Overview', icon: Info },
            { id: 'financials', label: 'Financials', icon: TrendingUp },
            { id: 'legal', label: 'Legal', icon: Scale },
            { id: 'tenants', label: 'Tenants', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'text-indigo-400 bg-white/5' 
                  : 'text-slate-400'
              }`}
            >
              <tab.icon size={18} />
              <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reject Modal */}
      <AnimatePresence>
        {isRejecting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRejecting(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center">
                    <AlertCircle size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Request Changes</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">
                  Provide detailed feedback for the issuer. This asset will be moved back to the "Draft" stage.
                </p>
                <textarea 
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Describe what needs to be fixed..."
                  className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={() => setIsRejecting(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onReject(data._id, rejectReason);
                    setIsRejecting(false);
                  }}
                  disabled={!rejectReason.trim()}
                  className="flex-1 py-3 bg-rose-600 text-white text-sm font-bold rounded-xl hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-600/20"
                >
                  Send Feedback
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
