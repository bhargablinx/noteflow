import NotesCard from "./NotesCard";
import Searchbar from "./Searchbar";

export default function MainSection() {
    return (
        <main className="flex-1 p-6 space-y-4 bg-gray-50 dark:bg-gray-950 h-full overflow-y-auto transition-colors duration-300">
            {/* Search */}
            <Searchbar />

            {/* Notes */}
            <div className="space-y-4">
                {/* Card */}
                <NotesCard
                    title="Project Phoenix Brainstorm"
                    descriptionPreview="Brainstorm ideas for the new SaaS product. Focus on scalability, pricing model, and MVP features."
                    tags={["#work", "#study", "#personal"]}
                    lastEdited="2 hours ago"
                />

                <NotesCard
                    title="Weekly Grocery List"
                    descriptionPreview="Milk, eggs, bread, fruits, vegetables, and snacks for the week. Also check discounts."
                    tags={["#personal", "#shopping"]}
                    lastEdited="5 hours ago"
                />

                <NotesCard
                    title="Physics Study Notes"
                    descriptionPreview="Revise kinematics, laws of motion, and numerical problems for upcoming test."
                    tags={["#study", "#physics"]}
                    lastEdited="1 day ago"
                />
            </div>
        </main>
    );
}
