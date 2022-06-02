const Page = ({
  children,
  id,
  className
}) => {
  return <main id={id} className={className}>{children}</main>
}


export default Page
