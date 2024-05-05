import { ReactNode } from "react";

export const MusicSheet = ({ notes }: { notes: string[] }) => {
  //
  return (
    <div className="relative flex w-full overflow-visible">
      {notes.map((note, i) => (
        <MusicSheetNote key={i} note={note} />
      ))}
    </div>
  );
};

export const MusicSheetNote = ({ note }: { note: string }) => {
  //
  return (
    <div className="w-8">
      <Space />
      <OuterLine>{note === "C6" && <Note flip />}</OuterLine>
      <Space>{note === "B5" && <Note flip />}</Space>
      <OuterLine>
        {note === "A5" && <Note flip />}
        {note === "B5" && <Note flip />}
      </OuterLine>
      <Space>{note === "G5" && <Note flip />}</Space>
      <Line>{note === "F5" && <Note flip />}</Line>
      <Space>{note === "E5" && <Note flip />}</Space>
      <Line>{note === "D5" && <Note flip />}</Line>
      <Space>{note === "C5" && <Note flip />}</Space>
      <Line>{note === "B4" && <Note flip />}</Line>
      <Space>{note === "A4" && <Note />}</Space>
      <Line>{note === "G4" && <Note />}</Line>
      <Space>{note === "F4" && <Note />}</Space>
      <Line>{note === "E4" && <Note />}</Line>
      <Space>{note === "D4" && <Note />}</Space>
      <OuterLine>{note === "C4" && <Note />}</OuterLine>
      <Space />
    </div>
  );
};

const Space = ({ children }: { children?: ReactNode }) => {
  //
  return (
    <div className="flex h-2.5 w-full items-center justify-center bg-white text-5xl text-black">
      {children}
    </div>
  );
};

const Line = ({ children }: { children?: ReactNode }) => {
  //
  return (
    <div className="flex h-0.5 w-full items-center justify-center bg-neutral-600 text-5xl text-black">
      {children}
    </div>
  );
};

const OuterLine = ({ children }: { children?: ReactNode }) => {
  //
  return (
    <div
      className={`flex h-0.5 w-full items-center justify-center text-5xl text-black ${children ? "bg-neutral-600" : "bg-white"}`}
    >
      {children}
    </div>
  );
};

const Note = ({ flip }: { flip?: boolean }) => {
  //
  return <div className={`pb-[1.875rem] ${flip && "rotate-180"}`}>♩</div>;
};
