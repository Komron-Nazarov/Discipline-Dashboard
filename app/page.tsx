import Card from "@/components/dashboard/Card";
import TopBar from "@/components/dashboard/TopBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white p-6">
      
{/*Header*/}

<div className="mb-8">
  <h1 className="text-3xl font-bold">Discipline Dashboard</h1>
  <p className="text-gray-400 mt-2"> Control your life. Build discipline.</p>
</div>

<TopBar/>

{/*Cards*/}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Tasks" value="5"/>
        <Card title="Habits" value="3"/>
        <Card title="Balance" value="120$"/>
        <Card title="Streak" value="7 days"/>
      </div>



{/* Placeholder Graph */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 h-[200px] flex items-center justify-center text-gray-500">
          Graph coming soon...
      </div>

    </main>
  );
}