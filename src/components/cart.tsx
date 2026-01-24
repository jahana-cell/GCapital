'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, itemAdded } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
                "relative transition-all duration-300", 
                itemAdded && 'animate-cart-shake'
            )}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      {/* Using standard 'bg-background' and 'border-border' ensures 
         this matches your Header color perfectly. 
      */}
      <SheetContent className="flex w-full flex-col sm:max-w-lg bg-background border-l border-border p-0">
        
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <SheetTitle className="font-serif text-2xl tracking-tight flex items-center gap-2">
            Shopping Cart <span className="text-muted-foreground text-lg">({cartCount})</span>
          </SheetTitle>
        </SheetHeader>
        
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 p-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-5">
                    {/* Product Image */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border border-border bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                          <h3 className="font-medium leading-tight line-clamp-2">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                      </div>

                      <p className="text-sm font-medium">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex items-center border border-border rounded-sm h-8">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-full flex items-center justify-center hover:bg-accent text-muted-foreground transition-colors"
                            >
                                <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-full flex items-center justify-center hover:bg-accent text-muted-foreground transition-colors"
                            >
                                <Plus className="h-3 w-3" />
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer / Checkout */}
            <div className="p-6 bg-muted/20 border-t border-border mt-auto">
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-base font-medium">
                            <p>Subtotal</p>
                            <p>${cartTotal.toFixed(2)}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Shipping & taxes calculated at checkout
                        </p>
                    </div>

                    <SheetClose asChild>
                        <Button 
                            asChild 
                            size="lg" 
                            className="w-full font-semibold tracking-wide uppercase text-xs h-12"
                        >
                            <Link href="/checkout">Proceed to Checkout</Link>
                        </Button>
                    </SheetClose>
                </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center p-6">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
                <h3 className="font-serif text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm max-w-[250px] mx-auto">
                  Add items to your cart to see them here.
                </p>
            </div>
            <SheetClose asChild>
              <Button 
                asChild 
                variant="outline" 
                className="mt-4 border-border hover:bg-accent uppercase text-xs tracking-wider"
              >
                <Link href="/shop">Start Browsing</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}