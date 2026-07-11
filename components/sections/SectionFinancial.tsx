"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Building2, Check, Copy, Eye, EyeOff, Landmark, ShieldCheck, WalletCards } from "lucide-react";
import { Badge, GlassCard, Section, SectionHeader, useToast } from "@/components/ui";

const accounts = [
  { bank: "กสิกรไทย", no: "xxx-x-4821-x", balance: 1841800, color: "#37D67A" },
  { bank: "กรุงไทย", no: "xxx-x-1074-x", balance: 920000, color: "#00D9FF" },
  { bank: "กรุงเทพ", no: "xxx-x-7539-x", balance: 480000, color: "#D8B46B" },
];
const expenses = [["ต้นทุนบัญชี",8000],["ค่าจัดหา",500],["ค่ารับรอง",500],["ค่าเดินทาง",300],["ค่าดำเนินการ",250],["ค่าทีม",180],["ค่าอื่นๆ",420]] as const;

export default function SectionFinancial() {
  const [hidden,setHidden]=useState(false); const [limit,setLimit]=useState("200K"); const [copied,setCopied]=useState("");
  const {show,ToastEl}=useToast(); const total=accounts.reduce((s,a)=>s+a.balance,0);
  const copy=(v:string)=>{navigator.clipboard.writeText(v).catch(()=>{});setCopied(v);show("คัดลอกเลขบัญชีแล้ว","success");setTimeout(()=>setCopied(""),1500)};
  return <Section>{ToastEl}<SectionHeader title="การเงิน" sub="FINANCIAL CONTROL CENTER"><button className="glow-btn" onClick={()=>setHidden(v=>!v)}>{hidden?<Eye size={13}/>:<EyeOff size={13}/>}</button></SectionHeader>
    <GlassCard style={{padding:20}}><div className="flex items-start justify-between"><div><p className="text-xs text-muted-foreground">สินทรัพย์พร้อมใช้งาน</p><p className="font-mono text-3xl font-bold gold-text">{hidden?"฿ •••••••":"฿"+total.toLocaleString()}</p><div className="mt-2 flex gap-2"><Badge text="+13.37% MTD" color="success" dot/><Badge text="3 บัญชี" color="cyan"/></div></div><WalletCards color="#D8B46B" size={30}/></div></GlassCard>
    <div className="grid grid-cols-2 gap-3">{[
      {l:"รับเงินวันนี้",v:"฿320,000",s:"14 รายการ",I:ArrowDownToLine,c:"#37D67A"},{l:"จ่ายวันนี้",v:"฿42,800",s:"7 รายการ",I:ArrowUpFromLine,c:"#FF5C5C"},
      {l:"รอตรวจสอบ",v:"฿19,500",s:"3 รายการ",I:ShieldCheck,c:"#FFB648"},{l:"วงเงินคงเหลือ",v:"฿127,000",s:"จาก 200K",I:Landmark,c:"#00D9FF"}
    ].map(({l,v,s,I,c})=><div className="lux-card p-4" key={l}><I size={17} color={c}/><p className="mt-3 font-mono text-lg font-bold" style={{color:c}}>{v}</p><p className="text-sm">{l}</p><p className="text-xs text-muted-foreground">{s}</p></div>)}</div>
    <GlassCard style={{padding:18}}><div className="mb-4 flex items-center justify-between"><h3 className="font-serif text-lg">บัญชีธนาคาร</h3><Badge text="AUTO SYNC" color="success" dot/></div><div className="flex flex-col gap-3">{accounts.map(a=><div key={a.no} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[.02] p-3"><span className="icon-circle"><Building2 size={16} color={a.color}/></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{a.bank}</p><p className="font-mono text-[10px] text-muted-foreground">{a.no}</p></div><div className="text-right"><p className="font-mono text-sm font-bold" style={{color:a.color}}>{hidden?"••••":"฿"+a.balance.toLocaleString()}</p><button aria-label="คัดลอกเลขบัญชี" onClick={()=>copy(a.no)} className="text-muted-foreground">{copied===a.no?<Check size={12}/>:<Copy size={12}/>}</button></div></div>)}</div></GlassCard>
    <div className="grid gap-3 md:grid-cols-[.8fr_1.2fr]"><GlassCard style={{padding:18}}><h3 className="mb-3 font-serif text-lg">วงเงินอนุมัติ</h3><div className="grid grid-cols-2 gap-2">{["50K","100K","200K","500K"].map(x=><button key={x} onClick={()=>setLimit(x)} className="rounded-xl border px-3 py-2 font-mono text-xs" style={{borderColor:limit===x?"#D8B46B":"rgba(255,255,255,.1)",color:limit===x?"#D8B46B":"rgba(255,255,255,.45)",background:limit===x?"rgba(216,180,107,.08)":"transparent"}}>{x}</button>)}</div></GlassCard><GlassCard style={{padding:18}}><h3 className="mb-3 font-serif text-lg">ต้นทุนแฝง</h3>{expenses.map(([l,v])=><div key={l} className="flex justify-between border-b border-white/5 py-1.5 text-sm"><span className="text-muted-foreground">{l}</span><span className="font-mono">฿{v.toLocaleString()}</span></div>)}<div className="mt-3 flex justify-between"><b>รวมต้นทุน</b><b className="font-mono text-red-400">฿10,150</b></div></GlassCard></div>
    <GlassCard style={{padding:18}}><h3 className="mb-4 font-serif text-lg">สรุปกำไร</h3>{[["ราคาขาย","฿13,000"],["ต้นทุนรวม","฿10,150"],["กำไรจริง","฿2,850"],["กำไร %","21.92%"]].map(([l,v],i)=><div key={l} className="flex justify-between py-2"><span className="text-sm text-muted-foreground">{l}</span><span className={`font-mono font-bold ${i>1?"text-emerald-400":""}`}>{v}</span></div>)}</GlassCard>
  </Section>;
}
