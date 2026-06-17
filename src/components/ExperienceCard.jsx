const ExperienceCard = ({ title, description }) => {
  return (
    <div className="bg-white border border-gray-200 border-l-[3px] border-l-primary p-4 rounded-r-md flex-shrink-0 w-[280px] sm:w-auto">
      <h4 className="font-semibold text-foreground text-[14px] mb-1">{title}</h4>
      <p className="text-[12px] text-gray-600 leading-snug">{description}</p>
    </div>
  );
};

export default ExperienceCard;
