import Card from "@/components/common/Card";
import Image from "next/image";
import { PredictionResponse } from "@/types/prediction";

type Props = {
  label: PredictionResponse["label"];
};

export default function ResultIllustration({ label }: Props) {
  return (
    <Card className="result-illustration-card result-surface overflow-hidden p-0">
      <Image
        src={label === "High Risk" ? "/images/High_Risk_Result.png" : "/images/Low_Risk_Result.png"}
        alt="Mental health self-check result illustration"
        width={1200}
        height={900}
        className="h-full w-full object-cover"
        priority
      />
    </Card>
  );
}
