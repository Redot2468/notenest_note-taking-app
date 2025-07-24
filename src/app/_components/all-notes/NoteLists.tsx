export default function NoteLists() {
  return (
    <div>
      <h1 className="text-preset-1 text-neutral-950 capitalize">all notes</h1>

      <div>
        {/* note list card */}
        {Array.from({ length: 8 }, (_, i) => i).map((num, arrIndex, arr) => (
          <div key={num} className="flex flex-col gap-3 p-2">
            <p className="text-preset-3 text-neutral-950 capitalize">
              react performance optimization
            </p>

            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 2 }, (_, i) => i).map((num) => (
                <div
                  key={num}
                  className="radius-4 flex w-fit items-center justify-center gap-1 border border-[#D4E2FF] bg-neutral-200 px-1.5 py-0.5"
                >
                  <p className="text-preset-6 text-neutral-950 capitalize">
                    dev
                  </p>
                </div>
              ))}
            </div>

            <p className="text-preset-6 text-neutral-700">29 Oct 2024</p>

            {arrIndex !== arr.length - 1 && (
              <div className="radius-20 h-[1px] bg-neutral-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
