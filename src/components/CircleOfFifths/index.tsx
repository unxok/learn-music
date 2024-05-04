import { PieChart } from "react-minimal-pie-chart";
import "./style.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import quarterNote from "@/assets/quarterNote.svg";

const MAJOR = "major";
const MINOR = "minor";
const KEY_SIGNATURE = "keySignature";
type MAJOR_MINOR_KEY_SIGNATURE =
  | typeof MAJOR
  | typeof MINOR
  | typeof KEY_SIGNATURE;

export const CicleOfFifths = () => {
  const [circleView, setCircleView] =
    useState<MAJOR_MINOR_KEY_SIGNATURE>(MAJOR);

  const handleTabChange = (e: React.FormEvent<HTMLButtonElement>) =>
    setCircleView(e.currentTarget.value as MAJOR_MINOR_KEY_SIGNATURE);
  return (
    <article className="prose text-start text-secondary-foreground lg:prose-xl prose-headings:text-foreground">
      <h2 className="">Circle of Fifths</h2>
      <p>
        In music theory, the circle of fifths is a way of organizing pitches as
        a sequence of perfect fifths.
      </p>
      <Tabs
        // defaultValue={circleView}
        value={circleView}
        onValueChange={(v) => setCircleView(v as MAJOR_MINOR_KEY_SIGNATURE)}
        className="w-[400px] pb-3"
      >
        <TabsList>
          <TabsTrigger value={MAJOR}>Major</TabsTrigger>
          <TabsTrigger value={MINOR}>Minor</TabsTrigger>
          <TabsTrigger value={KEY_SIGNATURE}>Key signature</TabsTrigger>
        </TabsList>
      </Tabs>
      <Circle
        view={circleView}
        fifths={[
          { major: "A", minor: "f♯", keySignature: "3♯" },
          { major: "E", minor: "c♯", keySignature: "4♯" },
          { major: "B", minor: "g♯", keySignature: "7♭/5♯" },
          { major: "G♭/F♯", minor: "e♭/d♯", keySignature: "6♭/6♯" },
          { major: "D♭", minor: "b♭", keySignature: "5♭/7♯" },
          { major: "A♭", minor: "f", keySignature: "4♭" },
          { major: "E♭", minor: "c", keySignature: "3♭" },
          { major: "B♭", minor: "g", keySignature: "2♭" },
          { major: "F", minor: "d", keySignature: "1♭" },
          { major: "C", minor: "a", keySignature: "♮" },
          { major: "G", minor: "e", keySignature: "1♯" },
          { major: "D", minor: "b", keySignature: "2♯" },
        ]}
      />
      <KeySignatureImage />
      <p>
        Starting on a C, and using the standard system of tuning for Western
        music (12-tone equal temperament), the sequence is: C, G, D, A, E, B, F♯
        (G♭), C♯ (D♭), G♯ (A♭), D♯ (E♭), A♯ (B♭), E♯ (F), C.
      </p>
      <p>
        This order places the most closely related key signatures adjacent to
        one another. It is usually illustrated in the form of a circle.
        Twelve-tone equal temperament tuning divides each octave into twelve
        equivalent semitones, and the circle of fifths leads to a C seven
        octaves above the starting point. If the fifths are tuned with an exact
        ratio of 3:2 (the system of tuning known as just intonation), this is
        not the case (the circle does not "close").
      </p>
    </article>
  );
};

const QuarterNote = ({ children }: { children?: ReactNode }) => (
  <img className="mt-4 h-7" src={quarterNote} alt="quarter note" />
);

const TrebleSheetNote = ({
  className,
  note,
  displayType,
}: {
  className?: string;
  note: string;
  displayType: "note" | "sharp" | "flat";
}) => {
  const spaceClassName =
    "relative flex h-[0.625rem] items-center justify-center";
  const lineClassName =
    "relative flex h-0.5 items-center justify-center bg-black w-full";

  const El = () => {
    const display =
      displayType === "sharp" ? "♯" : displayType === "flat" ? "♭" : "♩";
    return (
      <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-xl font-extrabold text-black">
        {display}
      </div>
    );
  };
  return (
    <div
      className={cn(
        "flex w-5 flex-col items-center justify-center bg-white",
        className,
      )}
    >
      <div className={lineClassName + " w-fit"}>{note === "C6" && <El />}</div>
      <div className={spaceClassName}>{note === "B5" && <El />}</div>
      <div className={lineClassName + " w-fit"}>{note === "A5" && <El />}</div>
      <div className={spaceClassName}>{note === "G5" && <El />}</div>
      <div className={lineClassName}>{note === "F5" && <El />}</div>
      <div className={spaceClassName}>{note === "E5" && <El />}</div>
      <div className={lineClassName}>{note === "D5" && <El />}</div>
      <div className={spaceClassName}>{note === "C5" && <El />}</div>
      <div className={lineClassName}>{note === "B4" && <El />}</div>
      <div className={spaceClassName}>{note === "A4" && <El />}</div>
      <div className={lineClassName}>{note === "G4" && <El />}</div>
      <div className={spaceClassName}>{note === "F4" && <El />}</div>
      <div className={lineClassName}>{note === "E4" && <El />}</div>
      <div className={spaceClassName}>{note === "D4" && <El />}</div>
      <div className={lineClassName + " w-fit"}>{note === "C4" && <El />}</div>
      <div className={spaceClassName}></div>
    </div>
  );
};

const KeySignatureImage = () => {
  //
  return (
    <div className="flex flex-col gap-10 bg-slate-300">
      <TrebleSheetNote note="F4" displayType="note" />
    </div>
  );
};

const Circle = ({
  fifths,
  view,
}: {
  fifths: {
    major: string;
    minor: string;
    keySignature: string;
  }[];
  view: MAJOR_MINOR_KEY_SIGNATURE;
}) => {
  const sectionAngle = 360 / fifths.length;

  return (
    <div className="circle">
      {fifths.map((fifths, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="section bg-muted hover:bg-primary"
                style={{
                  transform: `rotate(${sectionAngle * index}deg) translateX(100px) rotate(${-sectionAngle * index}deg)`,
                }}
              >
                {fifths[view]}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div>
                <span className="text-muted-foreground">Major:</span>&nbsp;
                {fifths.major}
              </div>
              <div>
                <span className="text-muted-foreground">Minor:</span>&nbsp;
                {fifths.minor}
              </div>
              <div>
                <span className="text-muted-foreground">Key signature:</span>
                &nbsp;
                {fifths.keySignature}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
