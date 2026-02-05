'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, ArrowRight, CornerDownLeft, FileText, Briefcase, LayoutTemplate } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { allSearchableLinks } from "@/lib/constants"; 

// --- ICONS MAPPING ---
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

  // Toggle with CMD+K
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

  // Configure Fuse.js for powerful fuzzy search
  const fuse = React.useMemo(() => new Fuse(allSearchableLinks, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'description', weight: 0.3 },
      { name: 'type', weight: 0.1 }
    ],
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
      {/* --- TRIGGER BUTTON (RESPONSIVE) --- */}
      <button
        onClick={() => setOpen(true)}
        className="group relative flex items-center outline-none"
        aria-label="Search"
      >
        {/* MOBILE VIEW: Stylish Circle Icon (Visible only on small screens) */}
        <div className="flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 active:scale-95 transition-transform hover:bg-neutral-200">
            <Search className="w-4 h-4" />
        </div>

        {/* DESKTOP VIEW: Sleek Search Bar (Visible only on medium+ screens) */}
        <div className="hidden md:flex h-10 items-center gap-3 rounded-full bg-neutral-50 border border-neutral-200 px-4 pr-2 text-sm text-neutral-500 hover:border-neutral-300 hover:bg-white hover:text-black transition-all w-64 shadow-sm">
          <Search className="w-4 h-4 opacity-50" />
          <span className="flex-1 text-left font-light tracking-wide">Search...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-neutral-200 px-1.5 font-mono text-[10px] font-medium text-neutral-500 opacity-70">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </button>

      {/* --- LUXURY MODAL --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-2xl bg-white/95 backdrop-blur-xl border border-neutral-100 max-w-2xl sm:rounded-xl">
          <DialogTitle className="sr-only">Search Website</DialogTitle>
          
          <Command className="bg-transparent [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-neutral-400 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-item]]:px-4 [&_[cmdk-item]]:py-3">
            
            {/* Input Area */}
            <div className="flex items-center border-b border-neutral-100 px-4" cmdk-input-wrapper="">
              <Search className="mr-3 h-5 w-5 shrink-0 opacity-30 text-black" />
              <CommandInput
                placeholder="What are you looking for?"
                value={query}
                onValueChange={setQuery}
                className="flex h-16 w-full rounded-md bg-transparent py-3 text-lg outline-none placeholder:text-neutral-400 text-black font-serif disabled:cursor-not-allowed disabled:opacity-50 border-none focus:ring-0"
                style={{ fontSize: '16px' }} // Prevents iOS zoom
              />
              <button onClick={() => setOpen(false)} className="ml-2 p-1 hover:bg-neutral-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Results Area */}
            <CommandList className="max-h-[60vh] overflow-y-auto overflow-x-hidden p-2">
              <CommandEmpty className="py-12 text-center text-sm text-neutral-400 font-sans">
                No results found.
              </CommandEmpty>

              {query.length > 0 && (
                  <CommandGroup heading="Suggestions">
                    {results.map((item, i) => (
                      <CommandItem
                        key={item.url + i}
                        value={item.title}
                        onSelect={() => runCommand(item.url)}
                        className="flex items-center justify-between rounded-lg px-4 py-3 text-neutral-700 aria-selected:bg-neutral-100 aria-selected:text-black transition-colors cursor-pointer group mb-1"
                      >
                        <div className="flex items-start gap-4">
                            {/* Type Badge */}
                            <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 group-aria-selected:bg-white group-aria-selected:shadow-sm">
                                {getTypeIcon(item.type)}
                            </div>
                            
                            <div className="flex flex-col gap-0.5">
                                <span className="font-serif text-lg leading-tight group-aria-selected:underline decoration-neutral-300 underline-offset-4 decoration-1">
                                    {item.title}
                                </span>
                                <span className="font-sans text-xs text-neutral-400 line-clamp-1 font-light">
                                    {item.description}
                                </span>
                            </div>
                        </div>
                        <CornerDownLeft className="w-4 h-4 opacity-0 group-aria-selected:opacity-30 -translate-x-2 group-aria-selected:translate-x-0 transition-all duration-300" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
              )}

              {/* Empty State / Quick Links */}
              {query.length === 0 && (
                <CommandGroup heading="Popular Destinations">
                   {allSearchableLinks.slice(0, 5).map((item, i) => (
                      <CommandItem
                        key={item.url + i}
                        value={item.title}
                        onSelect={() => runCommand(item.url)}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-neutral-600 aria-selected:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        <ArrowRight className="w-3 h-3 opacity-30" />
                        <span className="font-serif text-base">{item.title}</span>
                      </CommandItem>
                   ))}
                </CommandGroup>
              )}
            </CommandList>
            
            {/* Footer */}
            <div className="hidden md:flex justify-between items-center p-3 border-t border-neutral-100 bg-neutral-50/50">
                <span className="text-[10px] text-neutral-400 font-sans">
                    <strong>↑↓</strong> to navigate
                </span>
                <span className="text-[10px] text-neutral-400 font-sans">
                    <strong>↵</strong> to select
                </span>
            </div>

          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
