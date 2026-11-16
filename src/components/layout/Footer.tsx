export function Footer() {
  return (
    <footer className="border-t bg-muted/50" role="contentinfo">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} gomaflex. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}