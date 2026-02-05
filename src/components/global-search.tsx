'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, ArrowRight, CornerDownLeft, FileText, Briefcase, LayoutTemplate } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { allSearchableLinks } from "@/lib/constants"; 

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Project': return <Briefcase className="w-3 h-3" />;
    case 'Service': return <LayoutTemplate className="w-3 h-3" />;
    default: return <FileText className="w-3 h-3" />;
  }
};

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const fuse = React.useMemo(() => new Fuse(allSearchableLinks, {
    keys: [{ name: 'title', weight: 0.7 }, { name: 'description', weight: 0.3 }, { name: 'type', weight: 0.1 }],
    threshold: 0.4,
    includeScore: true,
  }), []);

  const results = React.useMemo(() => {
    if (!query) return [];
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse]);

  const runCommand = React.useCallback((url: string) => {
    setOpen(false);
    router.push(url);
  }, [router]);

  return (
    <>
      {/* --- TRIGGER BUTTON --- */}
      <button
        onClick={() => setOpen(true)}
        className="group relative flex items-center w-full md:w-auto outline-none"
        aria-label="Search"
      >
        <div className="flex h-11 md:h-10 w-full md:w-64 items-center gap-3 rounded-md md:rounded-full bg-neutral-100/50 md:bg-neutral-50 border border-neutral-200/60 md:border-neutral-200 px-4 pr-2 text-sm text-neutral-500 hover:border-neutral-300 hover:bg-white hover:text-black transition-all shadow-sm">
          <Search className="w-4 h-4 opacity-50 stroke-[1.5px]" />
          <span className="flex-1 text-left font-light tracking-wide">Search...</span>
          <kbd className="hidden md:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded bg-neutral-200 px-1.5 font-mono text-[10px] font-medium text-neutral-500 opacity-70">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </button>

      {/* --- SEARCH MODAL --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* FIX: 
            1. Added `top-[10%] translate-y-0` to force it higher up so keyboard doesn't cover it.
            2. Added `data-[state=open]:slide-in-from-top-2` for a nice slide-down effect.
        */}
        <DialogContent className="fixed left-[50%] top-[10%] translate-x-[-50%] translate-y-0 overflow-hidden p-0 shadow-2xl bg-white/95 backdrop-blur-xl border border-neutral-100 max-w-2xl w-[90vw] sm:rounded-xl z-[200] data-[state=open]:slide-in-from-top-2 duration-200">
          <DialogTitle className="sr-only">Search Website</DialogTitle>
          <Command className="bg-transparent [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-neutral-400 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-item]]:px-4 [&_[cmdk-item]]:py-3">
            
            {/* Input Area - FIX: Removed the manual <button><X/></button> here */}
            <div className="flex items-center border-b border-neutral-100 px-4" cmdk-input-wrapper="">
              <Search className="mr-3 h-5 w-5 shrink-0 opacity-30 text-black stroke-[1.5px]" />
              <CommandInput
                placeholder="What are you looking for?"
                value={query}
                onValueChange={setQuery}
                className="flex h-16 w-full rounded-md bg-transparent py-3 text-lg outline-none placeholder:text-neutral-400 text-black font-serif disabled:cursor-not-allowed disabled:opacity-50 border-none focus:ring-0"
                style={{ fontSize: '16px' }} // Prevents iOS auto-zoom
              />
            </div>

            {/* Results Area */}
            <CommandList className="max-h-[50vh] overflow-y-auto overflow-x-hidden p-2">
              <CommandEmpty className="py-12 text-center text-sm text-neutral-400 font-sans">No results found.</CommandEmpty>
              {query.length > 0 && (
                  <CommandGroup heading="Suggestions">
                    {results.map((item, i) => (
                      <CommandItem key={item.url + i} value={item.title} onSelect={() => runCommand(item.url)} className="flex items-center justify-between rounded-lg px-4 py-3 text-neutral-700 aria-selected:bg-neutral-100 aria-selected:text-black transition-colors cursor-pointer group mb-1">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 group-aria-selected:bg-white group-aria-selected:shadow-sm">{getTypeIcon(item.type)}</div>
                            <div className="flex flex-col gap-0.5"><span className="font-serif text-lg leading-tight group-aria-selected:underline decoration-neutral-300 underline-offset-4 decoration-1">{item.title}</span><span className="font-sans text-xs text-neutral-400 line-clamp-1 font-light">{item.description}</span></div>
                        </div>
                        <CornerDownLeft className="w-4 h-4 opacity-0 group-aria-selected:opacity-30 -translate-x-2 group-aria-selected:translate-x-0 transition-all duration-300" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
              )}
              {query.length === 0 && (
                <CommandGroup heading="Popular Destinations">
                   {allSearchableLinks.slice(0, 5).map((item, i) => (
                      <CommandItem key={item.url + i} value={item.title} onSelect={() => runCommand(item.url)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-neutral-600 aria-selected:bg-neutral-50 transition-colors cursor-pointer">
                        <ArrowRight className="w-3 h-3 opacity-30" />
                        <span className="font-serif text-base">{item.title}</span>
                      </CommandItem>
                   ))}
                </CommandGroup>
              )}
            </CommandList>
            <div className="hidden md:flex justify-between items-center p-3 border-t border-neutral-100 bg-neutral-50/50">
                <span className="text-[10px] text-neutral-400 font-sans"><strong>↑↓</strong> to navigate</span>
                <span className="text-[10px] text-neutral-400 font-sans"><strong>↵</strong> to select</span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}