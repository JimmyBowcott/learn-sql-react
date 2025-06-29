import AppShell from "../AppShell.tsx";

function AboutPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-bold text-3xl">About</h1>
          <p>This app is designed as an interactive SQL practice tool.
            Work through the levels by executing queries in real-time.</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-bold text-3xl">How to use?</h1>
          <p>The description of the task is displayed at the top:</p>
          <img src="./img/about-1.webp" className="w-auto max-w-[600px]" />
          <p>The box on the right shows the schema for each table.
          Clicking the name will allow you to select from the relevant tables to problem:</p>
          <img src="./img/about-2.webp" className="w-auto max-w-[600px]" />
          <p>The main box is where you will write your query.
          Pressing the play button will execute the query:</p>
          <img src="./img/about-3.webp" className="w-auto max-w-[600px]" />
          <p>Once the correct solution has been submitted, the 'Next level' button will appear green:</p>
          <img src="./img/about-4.webp" className="w-auto max-w-[600px]" />
        </div>
      </div>
    </AppShell>
  )
}

export default AboutPage;
