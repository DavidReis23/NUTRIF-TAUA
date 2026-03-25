import React from "react";
import { ChevronRight, Clock, Utensils } from "lucide-react";
import { CURRENT_USER, MOCK_MEALS } from "../../shared/constants";

interface HomeProps {
  onSeeMoreMeals: () => void;
  onSeeWeeklyMenu: () => void;
}

const Home: React.FC<HomeProps> = ({ onSeeMoreMeals, onSeeWeeklyMenu }) => {
  const [isMenuReleased, setIsMenuReleased] = React.useState(false); // Simulates if nutritionist launched the menu
  const today = "Seg"; // Simulação do dia atual
  // Refeições de hoje no carrossel
  const nextMeals = MOCK_MEALS.filter((m) => m.day === today);

  // Refeições da "próxima semana" para a prévia (simulado pegando IDs 4, 5, 6)
  const weeklyPreview = MOCK_MEALS.slice(3, 6);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-green-100 text-green-700">
            Confirmado
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-orange-100 text-orange-700">
            Não Confirmado
          </span>
        );
      case "restricted":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-700">
            Fora do Turno
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-black tracking-tight">
            Olá, {CURRENT_USER.name.split(" ")[0]} 🌞
          </h2>
          <p className="opacity-80 mt-1 font-medium">
            Confira suas refeições de hoje!
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      </div>

      {/* Next Meals Carousel */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-lg font-black text-gray-800 tracking-tight">
            Refeições de Hoje
          </h3>
          <button
            onClick={onSeeMoreMeals}
            className="text-green-600 text-xs font-black uppercase tracking-widest flex items-center gap-1"
          >
            Ver Todos <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-1 px-1">
          {nextMeals.map((meal) => (
            <div
              key={meal.id}
              className={`min-w-[280px] bg-white border border-gray-100 rounded-[2rem] p-5 shadow-lg shadow-gray-200/40 flex items-start gap-4 border-l-4 transition-all ${
                meal.status === "confirmed"
                  ? "border-l-green-500"
                  : meal.status === "restricted"
                    ? "border-l-blue-500"
                    : "border-l-orange-400"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  meal.status === "confirmed"
                    ? "bg-green-50 text-green-600"
                    : meal.status === "restricted"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-orange-50 text-orange-500"
                }`}
              >
                <Utensils className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">
                    {meal.type}
                  </span>
                  {getStatusBadge(meal.status)}
                </div>
                <h4 className="font-black text-gray-800 leading-tight text-lg">
                  {meal.menu}
                </h4>
                <div className="flex items-center gap-1 mt-3 text-xs text-gray-400 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{meal.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Menu Preview Section */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-lg font-black text-gray-800 tracking-tight">
            Cardápio Próxima Semana
          </h3>
          {isMenuReleased && (
            <button
              onClick={onSeeWeeklyMenu}
              className="text-green-600 text-xs font-black uppercase tracking-widest flex items-center gap-1"
            >
              Confirmar <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {!isMenuReleased ? (
          <div
            onClick={onSeeWeeklyMenu}
            className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col items-center text-center space-y-4 cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 animate-pulse">
              <Utensils className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-800 text-base">
                Aguardando Cardápio
              </h4>
              <p className="text-xs text-gray-400 font-bold leading-relaxed px-4">
                A nutricionista ainda não enviou o cardápio da próxima semana.
                Clique para conferir.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {weeklyPreview.map((meal) => (
              <div
                key={meal.id}
                onClick={onSeeWeeklyMenu}
                className={`bg-white border border-gray-100 rounded-[2rem] p-5 shadow-sm flex items-center gap-4 border-l-4 cursor-pointer transition-all active:scale-[0.98] ${
                  meal.status === "pending"
                    ? "border-l-gray-300 opacity-60"
                    : meal.status === "confirmed"
                      ? "border-l-green-500"
                      : "border-l-red-500"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                    meal.status === "pending"
                      ? "bg-gray-50 text-gray-300"
                      : meal.status === "confirmed"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500"
                  }`}
                >
                  <Utensils className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${meal.status === "pending" ? "text-gray-300" : "text-gray-400"}`}
                    >
                      {meal.day} - {meal.type}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase ${
                        meal.status === "pending"
                          ? "bg-gray-100 text-gray-400"
                          : meal.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {meal.status === "pending"
                        ? "Pendente"
                        : meal.status === "confirmed"
                          ? "Confirmado"
                          : "Não Merendará"}
                    </span>
                  </div>
                  <h4
                    className={`font-black leading-tight text-base ${meal.status === "pending" ? "text-gray-300" : "text-gray-800"}`}
                  >
                    {meal.menu}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
